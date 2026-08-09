import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth/auth-service';

function isAuthenticated(auth: AuthService) {
  if (!auth.hasRequiredCookies()) return of(false);

  if (auth.isTokenValid()) return of(true);

  if (!auth.isRefreshTokenValid()) return of(false);

  return auth.refreshToken().pipe(
    map(() => true),
    catchError(() => of(false)),
  );
}

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return isAuthenticated(auth).pipe(
    map((ok) => ok || router.createUrlTree(['/login'])),
  );
};

export const publicGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return isAuthenticated(auth).pipe(
    map((ok) => (ok ? router.createUrlTree(['/']) : true)),
  );
};

export const authMatch: CanMatchFn = () => {
  const auth = inject(AuthService);
  return isAuthenticated(auth);
};

export const publicMatch: CanMatchFn = () => {
  const auth = inject(AuthService);
  return isAuthenticated(auth).pipe(map((ok) => !ok));
};
