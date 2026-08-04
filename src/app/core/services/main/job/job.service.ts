import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../../env/environment';
import { ApiResponse } from '../../../models/interface/api-response.interface';
import { JobListItem, JobDetail, JobSearchParams } from '../../../models/interface/job.interface';
import { ApplyRequest } from '../../../models/interface/application.interface';

const BASE = `${environment.API_URL}api`;

@Injectable({ providedIn: 'root' })
export class JobService {
  private http = inject(HttpClient);

  searchJobs(params: JobSearchParams = {}) {
    let httpParams = new HttpParams();
    if (params.q) httpParams = httpParams.set('q', params.q);
    if (params.categoryId) httpParams = httpParams.set('categoryId', params.categoryId);
    if (params.city) httpParams = httpParams.set('city', params.city);
    if (params.province) httpParams = httpParams.set('province', params.province);
    if (params.salaryMin) httpParams = httpParams.set('salaryMin', params.salaryMin);
    if (params.salaryMax) httpParams = httpParams.set('salaryMax', params.salaryMax);
    if (params.sort) httpParams = httpParams.set('sort', params.sort);
    if (params.page) httpParams = httpParams.set('page', params.page);
    if (params.limit) httpParams = httpParams.set('limit', params.limit);
    if (params.fieldIds?.length) {
      params.fieldIds.forEach((id) => (httpParams = httpParams.append('fieldIds', id)));
    }
    if (params.workModeIds?.length) {
      params.workModeIds.forEach((id) => (httpParams = httpParams.append('workModeIds', id)));
    }
    if (params.employmentTypeIds?.length) {
      params.employmentTypeIds.forEach(
        (id) => (httpParams = httpParams.append('employmentTypeIds', id)),
      );
    }
    if (params.careerLevelIds?.length) {
      params.careerLevelIds.forEach((id) => (httpParams = httpParams.append('careerLevelIds', id)));
    }

    return this.http
      .get<ApiResponse<JobListItem[]>>(`${BASE}/jobs/search`, { params: httpParams })
      .pipe(catchError((err) => throwError(() => err)));
  }

  getJobDetail(jobId: string) {
    return this.http
      .get<ApiResponse<JobDetail>>(`${BASE}/jobs/${jobId}`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  applyJob(jobId: string, body: ApplyRequest) {
    return this.http
      .post<ApiResponse<unknown>>(`${BASE}/jobs/${jobId}/applications`, body)
      .pipe(catchError((err) => throwError(() => err)));
  }

  getMasterData(type: string) {
    return this.http
      .get<ApiResponse<{ id: number; code: string; name: string }[]>>(`${BASE}/master/${type}`)
      .pipe(catchError((err) => throwError(() => err)));
  }
}
