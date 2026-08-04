import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../../env/environment';
import { ApiResponse } from '../../../models/interface/api-response.interface';
import {
  Application,
  NotificationItem,
  CandidateProfile,
} from '../../../models/interface/application.interface';

const BASE = `${environment.API_URL}api`;

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private http = inject(HttpClient);

  getApplications() {
    return this.http
      .get<ApiResponse<Application[]>>(`${BASE}/candidate/applications`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  getApplicationTimeline(applicationId: string) {
    return this.http
      .get<ApiResponse<Application>>(`${BASE}/applications/${applicationId}/timeline`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  getCandidateProfile() {
    return this.http
      .get<ApiResponse<CandidateProfile>>(`${BASE}/candidate/profile`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  getNotifications(page = 1) {
    return this.http
      .get<ApiResponse<NotificationItem[]>>(`${BASE}/notifications?page=${page}&limit=20`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  markNotificationRead(id: string) {
    return this.http
      .patch<ApiResponse<unknown>>(`${BASE}/notifications/${id}/read`, {})
      .pipe(catchError((err) => throwError(() => err)));
  }

  markAllRead() {
    return this.http
      .patch<ApiResponse<unknown>>(`${BASE}/notifications/read-all`, {})
      .pipe(catchError((err) => throwError(() => err)));
  }

  getProfileCompletion() {
    return this.http
      .get<
        ApiResponse<{ percentage: number; missingFields: string[] }>
      >(`${BASE}/candidate/profile/completion`)
      .pipe(catchError((err) => throwError(() => err)));
  }
}
