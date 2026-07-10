import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../model/interface/api-response.interface';
import {
  LoginRequest,
  LoginResponse,
  GoogleLoginRequest,
  RegisterRequest,
  RegisterResponse,
  AuthUser,
} from '../../model/interface/auth.interface';

const BASE = `${environment.API_URL}api`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  currentUser = signal<AuthUser | null>(this.loadUser());

  private loadUser(): AuthUser | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const raw = localStorage.getItem('jk_user');
    return raw ? JSON.parse(raw) : null;
  }

  private handleAuthSuccess(res: ApiResponse<LoginResponse>) {
    if (res.success && isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jk_access_token', res.data.accessToken);
      localStorage.setItem('jk_refresh_token', res.data.refreshToken);
      localStorage.setItem('jk_user', JSON.stringify(res.data.user));
      this.currentUser.set(res.data.user);
    }
  }

  get isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!localStorage.getItem('jk_access_token');
  }

  login(body: LoginRequest) {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${environment.API_URL}api/auth/login`, body)
      .pipe(
        tap((res) => this.handleAuthSuccess(res)),
        catchError((err) => throwError(() => err)),
      );
  }

  loginWithGoogle(body: GoogleLoginRequest) {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${environment.API_URL}api/auth/google`, body)
      .pipe(
        tap((res) => this.handleAuthSuccess(res)),
        catchError((err) => throwError(() => err)),
      );
  }

  register(body: RegisterRequest) {
    return this.http
      .post<ApiResponse<RegisterResponse>>(`${environment.API_URL}api/auth/register`, body)
      .pipe(catchError((err) => throwError(() => err)));
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.http.post(`${BASE}/auth/logout`, {}).subscribe({ error: () => {} });
      localStorage.removeItem('jk_access_token');
      localStorage.removeItem('jk_refresh_token');
      localStorage.removeItem('jk_user');
    }
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  getMe() {
    return this.http.get<ApiResponse<AuthUser>>(`${BASE}/me`).pipe(
      tap((res) => {
        if (res.success) {
          this.currentUser.set(res.data);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('jk_user', JSON.stringify(res.data));
          }
        }
      }),
    );
  }
}
