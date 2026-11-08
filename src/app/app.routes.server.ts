import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'home', renderMode: RenderMode.Client },
  { path: 'notif', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Client },
];
