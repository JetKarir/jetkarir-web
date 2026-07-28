import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  /* ── Landing (with landing navbar) ── */
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/landing-layout/landing-layout').then((m) => m.LandingLayout),
    canActivate: [publicGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/landing/home/landing').then((m) => m.LandingPage),
      },
    ],
  },

  /* ── Public landing pages (no auth guard) ── */
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/landing-layout/landing-layout').then((m) => m.LandingLayout),
    children: [
      {
        path: 'about',
        loadComponent: () => import('./pages/landing/about/about').then((m) => m.AboutPage),
      },
    ],
  },

  /* ── Auth (centered card, no navbar) ── */
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/auth-layout/auth-layout').then((m) => m.AuthLayout),
    canActivate: [publicGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register').then((m) => m.RegisterPage),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./pages/auth/admin-login/admin-login').then((m) => m.AdminLoginPage),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./shared/layouts/auth-layout/auth-layout').then((m) => m.AuthLayout),
    canActivate: [publicGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/auth/forgot-password/forgot-password').then((m) => m.ForgotPasswordPage),
      },
      {
        path: 'verify-email',
        loadComponent: () =>
          import('./pages/auth/verify-email/verify-email').then((m) => m.VerifyEmailPage),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./pages/auth/reset-password/reset-password').then((m) => m.ResetPasswordPage),
      },
      {
        path: 'terms',
        loadComponent: () => import('./pages/auth/terms/terms').then((m) => m.TermsPage),
      },
      {
        path: 'privacy',
        loadComponent: () => import('./pages/auth/privacy/privacy').then((m) => m.PrivacyPage),
      },
      {
        path: 'help',
        loadComponent: () => import('./pages/auth/help/help').then((m) => m.HelpPage),
      },
    ],
  },

  /* ── Main App (with app navbar, requires login) ── */
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/main-layout/main-layout').then((m) => m.MainLayout),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/main/home/home').then((m) => m.HomePage),
      },
      {
        path: 'jobs',
        loadComponent: () => import('./pages/main/jobs/jobs').then((m) => m.JobsPage),
      },
      {
        path: 'applications',
        loadComponent: () =>
          import('./pages/main/applications/applications').then((m) => m.ApplicationsPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/main/profile/profile').then((m) => m.ProfilePage),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/main/notifications/notifications').then((m) => m.NotificationsPage),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
