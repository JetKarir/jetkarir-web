import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../env/environment';
import { AuthCookieService } from '../cookie/cookie-service';

@Injectable({ providedIn: 'root' })
export class LogoutService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private cookieService = inject(AuthCookieService);

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.http.post(`${environment.API_URL}api/auth/logout`, {}).subscribe({ error: () => {} });
      this.cookieService.clearAuthCookies();
    }
    this.router.navigate(['/login']);
  }
}
