import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GsiService {
  private platformId = inject(PLATFORM_ID);
  private initialized = false;
  private credentialHandler: ((idToken: string) => void) | null = null;

  init(handler: (idToken: string) => void): Promise<void> {
    this.credentialHandler = handler;
    if (!isPlatformBrowser(this.platformId) || !environment.OAUTH_GOOGLE_CLIENT_ID) {
      return Promise.resolve();
    }
    return this.loadScript().then(() => {
      if (this.initialized) return;
      this.initialized = true;
      (window as any).google.accounts.id.initialize({
        client_id: environment.OAUTH_GOOGLE_CLIENT_ID,
        callback: (res: { credential: string }) => this.credentialHandler?.(res.credential),
      });
    });
  }

  prompt() {
    (window as any).google?.accounts.id.prompt();
  }

  private loadScript(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).google?.accounts) { resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
}
