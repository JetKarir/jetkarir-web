import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, throwError, shareReplay, finalize, Observable } from 'rxjs';
import { environment } from '../../../../../env/environment';
import { ApiResponse } from '../../../models/interface/api-response.interface';
import { AuthCookieService } from '../cookie/cookie-service';

const BASE = `${environment.API_URL}api`;

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  private http = inject(HttpClient);
  private cookieService = inject(AuthCookieService);
  private refreshing$: Observable<string> | null = null;

  hasRequiredCookies(): boolean {
    const access = this.cookieService.getAny('jk_access_token');
    const refresh = this.cookieService.getAny('jk_refresh_token');
    const userRaw = this.cookieService.getAny('jk_user');
    try {
      return !!access && !!refresh && !!JSON.parse(userRaw ?? '{}')?.username;
    } catch {
      return false;
    }
  }

  isRefreshTokenValid(): boolean {
    const expStr = this.cookieService.getAny('jk_refresh_token_exp');
    return !!expStr && new Date(expStr) > new Date();
  }

  isTokenValid(): boolean {
    const token = this.cookieService.getAny('jk_access_token');
    if (!token) return false;
    const expStr = this.cookieService.getAny('jk_access_token_exp');
    if (!expStr || new Date(expStr) <= new Date()) return false;
    if (!this.cookieService.getAny('jk_refresh_token')) return false;
    const userRaw = this.cookieService.getAny('jk_user');
    if (!userRaw) return false;
    try {
      return !!JSON.parse(userRaw)?.username;
    } catch {
      return false;
    }
  }

  isExpiringSoon(thresholdSeconds = 60): boolean {
    const expStr = this.cookieService.getAny('jk_access_token_exp');
    if (!expStr) return false;
    const msLeft = new Date(expStr).getTime() - Date.now();
    return msLeft > 0 && msLeft <= thresholdSeconds * 1000;
  }

  refreshToken(): Observable<string> {
    if (this.refreshing$) return this.refreshing$;

    const token = AuthCookieService.get('jk_refresh_token');
    if (!token) return throwError(() => new Error('No refresh token'));

    this.refreshing$ = this.http
      .post<ApiResponse<{ accessToken: string; expiresIn: number; refreshToken: string; refreshExpiresIn: number }>>(
        `${BASE}/auth/refresh`,
        { refreshToken: token },
      )
      .pipe(
        tap((res) => {
          if (res.success) {
            const { accessToken, expiresIn, refreshToken: newRefresh, refreshExpiresIn } = res.data;
            const accessExpAt = new Date(Date.now() + expiresIn * 1000).toISOString();
            const refreshExpAt = new Date(Date.now() + refreshExpiresIn * 1000).toISOString();
            this.cookieService.set('jk_access_token', accessToken, expiresIn);
            this.cookieService.set('jk_access_token_exp', accessExpAt, expiresIn);
            this.cookieService.set('jk_refresh_token', newRefresh, refreshExpiresIn);
            this.cookieService.set('jk_refresh_token_exp', refreshExpAt, refreshExpiresIn);
            const user = AuthCookieService.get('jk_user');
            if (user) this.cookieService.set('jk_user', user, refreshExpiresIn);
          }
        }),
        map((res) => {
          if (!res.success || !res.data) throw new Error(res.message ?? 'Refresh failed');
          return res.data.accessToken;
        }),
        shareReplay(1),
        finalize(() => { this.refreshing$ = null; }),
      );

    return this.refreshing$;
  }
}
