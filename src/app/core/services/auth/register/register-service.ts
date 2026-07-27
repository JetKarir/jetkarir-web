import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ApiResponse } from '../../../models/interface/api-response.interface';
import { RegisterRequest, RegisterResponse } from '../../../models/interface/auth.interface';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private http = inject(HttpClient);

  register(body: RegisterRequest) {
    return this.http
      .post<ApiResponse<RegisterResponse>>(`${environment.API_URL}api/auth/register`, body)
      .pipe(catchError((err) => throwError(() => err)));
  }
}
