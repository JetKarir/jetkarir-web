import { Injectable, inject, signal, PLATFORM_ID, REQUEST } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { tap, map, throwError, shareReplay, finalize, Observable } from 'rxjs';
import { environment } from '../../../../env/environment';
import { ApiResponse } from '../../models/interface/api-response.interface';
import { LoginResponse, AuthUser } from '../../models/interface/auth.interface';

const BASE = `${environment.API_URL}api`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private request = inject(REQUEST, { optional: true });

  currentUser = signal<AuthUser | null>(this.loadUser());
  loadingUser = signal(false);
  private refreshing$: Observable<string> | null = null;

  private setCookie(name: string, value: string, maxAge: number) {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Strict`;
  }

  static getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.split('; ').find((r) => r.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
  }

  private deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; max-age=0`;
  }

  private loadUser(): AuthUser | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const raw = AuthService.getCookie('jk_user');
    return raw ? JSON.parse(raw) : null;
  }

  storeAuthData(res: ApiResponse<LoginResponse>) {
    if (res.success && isPlatformBrowser(this.platformId)) {
      const accessExpAt = new Date(Date.now() + res.data.expiresIn * 1000).toISOString();
      const refreshExpAt = new Date(Date.now() + res.data.refreshExpiresIn * 1000).toISOString();
      this.setCookie('jk_access_token', res.data.accessToken, res.data.expiresIn);
      this.setCookie('jk_access_token_exp', accessExpAt, res.data.expiresIn);
      this.setCookie('jk_refresh_token', res.data.refreshToken, res.data.refreshExpiresIn);
      this.setCookie('jk_refresh_token_exp', refreshExpAt, res.data.refreshExpiresIn);
      this.setCookie('jk_user', JSON.stringify(res.data.user), res.data.refreshExpiresIn);
      this.currentUser.set(res.data.user);
    }
  }

  get isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!AuthService.getCookie('jk_access_token');
  }

  private getServerCookie(name: string): string | null {
    const cookieHeader = this.request?.headers.get('cookie') ?? '';
    const match = cookieHeader.split('; ').find((r) => r.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
  }

  hasRequiredCookies(): boolean {
    const getCookie = (name: string) =>
      isPlatformBrowser(this.platformId)
        ? AuthService.getCookie(name)
        : this.getServerCookie(name);
    const access = getCookie('jk_access_token');
    const refresh = getCookie('jk_refresh_token');
    const userRaw = getCookie('jk_user');
    try {
      return !!access && !!refresh && !!JSON.parse(userRaw ?? '{}')?.username;
    } catch {
      return false;
    }
  }

  isRefreshTokenValid(): boolean {
    const expStr = isPlatformBrowser(this.platformId)
      ? AuthService.getCookie('jk_refresh_token_exp')
      : this.getServerCookie('jk_refresh_token_exp');
    return !!expStr && new Date(expStr) > new Date();
  }

  isTokenValid(): boolean {
    const getCookie = (name: string) =>
      isPlatformBrowser(this.platformId)
        ? AuthService.getCookie(name)
        : this.getServerCookie(name);

    const token = getCookie('jk_access_token');
    if (!token) return false;

    const expStr = getCookie('jk_access_token_exp');
    if (!expStr || new Date(expStr) <= new Date()) return false;

    const refreshToken = getCookie('jk_refresh_token');
    if (!refreshToken) return false;

    const userRaw = getCookie('jk_user');
    if (!userRaw) return false;
    try {
      const user = JSON.parse(userRaw);
      if (!user?.username) return false;
    } catch {
      return false;
    }

    return true;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.http.post(`${BASE}/auth/logout`, {}).subscribe({ error: () => {} });
      this.deleteCookie('jk_access_token');
      this.deleteCookie('jk_access_token_exp');
      this.deleteCookie('jk_refresh_token');
      this.deleteCookie('jk_refresh_token_exp');
      this.deleteCookie('jk_user');
    }
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<string> {
    if (this.refreshing$) return this.refreshing$;

    const token = AuthService.getCookie('jk_refresh_token');
    if (!token) {
      this.logout();
      return throwError(() => new Error('No refresh token'));
    }

    this.refreshing$ = this.http
      .post<ApiResponse<{ accessToken: string; expiresIn: number; refreshToken: string; refreshExpiresIn: number }>>(`${BASE}/auth/refresh`, { refreshToken: token })
      .pipe(
        tap((res) => {
          if (res.success && isPlatformBrowser(this.platformId)) {
            const accessExpAt = new Date(Date.now() + res.data.expiresIn * 1000).toISOString();
            const refreshExpAt = new Date(Date.now() + res.data.refreshExpiresIn * 1000).toISOString();
            this.setCookie('jk_access_token', res.data.accessToken, res.data.expiresIn);
            this.setCookie('jk_access_token_exp', accessExpAt, res.data.expiresIn);
            this.setCookie('jk_refresh_token', res.data.refreshToken, res.data.refreshExpiresIn);
            this.setCookie('jk_refresh_token_exp', refreshExpAt, res.data.refreshExpiresIn);
            const user = AuthService.getCookie('jk_user');
            if (user) this.setCookie('jk_user', user, res.data.refreshExpiresIn);
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

  getMe() {
    this.loadingUser.set(true);
    return this.http.get<ApiResponse<AuthUser>>(`${BASE}/me`).pipe(
      tap((res) => {
        if (res.success && isPlatformBrowser(this.platformId)) {
          this.currentUser.set(res.data);
          const token = AuthService.getCookie('jk_access_token');
          let maxAge = 0;
          if (token) {
            try {
              const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
              maxAge = Math.max(0, payload['exp'] - Math.floor(Date.now() / 1000));
            } catch { maxAge = 0; }
          }
          this.setCookie('jk_user', JSON.stringify(res.data), maxAge);
        }
      }),
      finalize(() => this.loadingUser.set(false)),
    );
  }
}
