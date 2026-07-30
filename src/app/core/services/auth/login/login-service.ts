import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../models/interface/api-response.interface';
import {
  LoginRequest,
  LoginResponse,
  GoogleLoginRequest,
} from '../../../models/interface/auth.interface';
import { AuthService } from '../auth-service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  login(body: LoginRequest) {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${environment.API_URL}api/auth/login`, body)
      .pipe(
        tap((res) => this.authService.storeAuthData(res)),
        catchError((err) => throwError(() => err)),
      );
  }

  loginWithGoogle(body: GoogleLoginRequest) {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${environment.API_URL}api/auth/google`, body)
      .pipe(
        tap((res) => this.authService.storeAuthData(res)),
        catchError((err) => throwError(() => err)),
      );
  }
}
