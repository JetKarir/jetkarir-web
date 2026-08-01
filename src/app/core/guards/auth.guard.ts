import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isTokenValid()) return true;

  return router.createUrlTree(['/login']);
};

export const publicGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isTokenValid()) return true;

  return router.createUrlTree(['/']);
};

export const authMatch: CanMatchFn = () => {
  const auth = inject(AuthService);
  return auth.isTokenValid();
};

export const publicMatch: CanMatchFn = () => {
  const auth = inject(AuthService);
  return !auth.isTokenValid();
};
