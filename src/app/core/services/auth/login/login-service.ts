import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, throwError, finalize } from 'rxjs';
import { environment } from '../../../../../env/environment';
import { ApiResponse } from '../../../models/interface/api-response.interface';
import {
  LoginRequest,
  LoginResponse,
  GoogleLoginRequest,
  AuthUser,
} from '../../../models/interface/auth.interface';
import { AuthCookieService } from '../cookie/cookie-service';
import { AuthTokenService } from '../token/token-service';
import { LogoutService } from '../logout/logout-service';

const BASE = `${environment.API_URL}api`;

// ── AuthService ──────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private cookieService = inject(AuthCookieService);
  private tokenService = inject(AuthTokenService);
  private logoutService = inject(LogoutService);

  currentUser = signal<AuthUser | null>(this.cookieService.loadUser());
  loadingUser = signal(false);

  storeAuthData(res: ApiResponse<LoginResponse>): void {
    this.cookieService.storeAuthData(res, (user) => this.currentUser.set(user));
  }

  get isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!AuthCookieService.get('jk_access_token');
  }

  hasRequiredCookies() { return this.tokenService.hasRequiredCookies(); }
  isRefreshTokenValid() { return this.tokenService.isRefreshTokenValid(); }
  isTokenValid() { return this.tokenService.isTokenValid(); }
  refreshToken() { return this.tokenService.refreshToken(); }

  initProactiveRefresh(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const check = () => {
      if (!AuthCookieService.get('jk_access_token')) return;
      if (this.tokenService.isExpiringSoon() && this.tokenService.isRefreshTokenValid()) {
        this.tokenService.refreshToken().subscribe({ error: () => {} });
      }
    };
    check();
    setInterval(check, 30_000);
  }

  logout(): void {
    this.logoutService.logout();
    this.currentUser.set(null);
  }

  getMe() {
    this.loadingUser.set(true);
    return this.http.get<ApiResponse<AuthUser>>(`${BASE}/me`).pipe(
      tap((res) => {
        if (res.success && isPlatformBrowser(this.platformId)) {
          this.currentUser.set(res.data);
          const token = AuthCookieService.get('jk_access_token');
          let maxAge = 0;
          if (token) {
            try {
              const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
              maxAge = Math.max(0, payload['exp'] - Math.floor(Date.now() / 1000));
            } catch { maxAge = 0; }
          }
          this.cookieService.set('jk_user', JSON.stringify(res.data), maxAge);
        }
      }),
      finalize(() => this.loadingUser.set(false)),
    );
  }
}

// ── OtherLoginService ───────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class OtherLoginService {
  private platformId = inject(PLATFORM_ID);
  private initialized = false;
  private credentialHandler: ((idToken: string) => void) | null = null;

  init(handler: (idToken: string) => void): Promise<void> {
    this.credentialHandler = handler;
    if (!isPlatformBrowser(this.platformId) || !environment.OAUTH_GOOGLE_CLIENT_ID) {
      return Promise.resolve();
    }
    return this.loadScript().then(() => {
      if (this.initialized) return;
      this.initialized = true;
      (window as any).google.accounts.id.initialize({
        client_id: environment.OAUTH_GOOGLE_CLIENT_ID,
        callback: (res: { credential: string }) => this.credentialHandler?.(res.credential),
      });
    });
  }

  prompt() {
    (window as any).google?.accounts.id.prompt();
  }

  private loadScript(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).google?.accounts) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
}

// ── LoginService ─────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class LoginService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  login(body: LoginRequest) {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${BASE}/auth/login`, body)
      .pipe(
        tap((res) => this.authService.storeAuthData(res)),
        catchError((err) => throwError(() => err)),
      );
  }

  loginWithGoogle(body: GoogleLoginRequest) {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${BASE}/auth/google`, body)
      .pipe(
        tap((res) => this.authService.storeAuthData(res)),
        catchError((err) => throwError(() => err)),
      );
  }
}
