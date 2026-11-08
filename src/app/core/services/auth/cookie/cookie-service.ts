import { Injectable, inject, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiResponse } from '../../../models/interface/api-response.interface';
import { LoginResponse, AuthUser } from '../../../models/interface/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthCookieService {
  private platformId = inject(PLATFORM_ID);
  private request = inject(REQUEST, { optional: true });

  set(name: string, value: string, maxAge: number): void {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Strict`;
  }

  static get(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.split('; ').find((r) => r.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
  }

  delete(name: string): void {
    document.cookie = `${name}=; path=/; max-age=0`;
  }

  getServerCookie(name: string): string | null {
    const cookieHeader = this.request?.headers.get('cookie') ?? '';
    const match = cookieHeader.split('; ').find((r) => r.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
  }

  getAny(name: string): string | null {
    return isPlatformBrowser(this.platformId)
      ? AuthCookieService.get(name)
      : this.getServerCookie(name);
  }

  loadUser(): AuthUser | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const raw = AuthCookieService.get('jk_user');
    return raw ? JSON.parse(raw) : null;
  }

  storeAuthData(res: ApiResponse<LoginResponse>, setUser: (user: AuthUser) => void): void {
    if (!res.success || !isPlatformBrowser(this.platformId)) return;
    const { accessToken, refreshToken, expiresIn, refreshExpiresIn, user } = res.data;
    const accessExpAt = new Date(Date.now() + expiresIn * 1000).toISOString();
    const refreshExpAt = new Date(Date.now() + refreshExpiresIn * 1000).toISOString();
    this.set('jk_access_token', accessToken, expiresIn);
    this.set('jk_access_token_exp', accessExpAt, expiresIn);
    this.set('jk_refresh_token', refreshToken, refreshExpiresIn);
    this.set('jk_refresh_token_exp', refreshExpAt, refreshExpiresIn);
    this.set('jk_user', JSON.stringify(user), refreshExpiresIn);
    setUser(user);
  }

  clearAuthCookies(): void {
    this.delete('jk_access_token');
    this.delete('jk_access_token_exp');
    this.delete('jk_refresh_token');
    this.delete('jk_refresh_token_exp');
    this.delete('jk_user');
  }
}
