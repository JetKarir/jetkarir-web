import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../../env/environment';
import { ApiResponse } from '../../../models/interface/api-response.interface';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
  private http = inject(HttpClient);

  forgotPassword(email: string) {
    return this.http
      .post<ApiResponse<null>>(`${environment.API_URL}api/auth/forgot-password`, { email })
      .pipe(catchError((err) => throwError(() => err)));
  }
}
