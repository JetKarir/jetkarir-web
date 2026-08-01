import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'home', renderMode: RenderMode.Client },
  { path: 'jobs', renderMode: RenderMode.Client },
  { path: 'applications', renderMode: RenderMode.Client },
  { path: 'profile', renderMode: RenderMode.Client },
  { path: 'notifications', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender },
];
