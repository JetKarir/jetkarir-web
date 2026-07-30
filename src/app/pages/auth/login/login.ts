import { Component, inject, signal, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentErrorCircle,
  fluentMail,
  fluentLockClosed,
  fluentEye,
  fluentEyeOff,
  fluentArrowLeft,
} from '@ng-icons/fluent-ui';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login/login-service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ToastModule, NgIcon],
  providers: [
    MessageService,
    provideIcons({
      fluentErrorCircle,
      fluentMail,
      fluentLockClosed,
      fluentEye,
      fluentEyeOff,
      fluentArrowLeft,
    }),
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginPage implements AfterViewInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);
  private platformId = inject(PLATFORM_ID);

  loading = signal(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailCtrl() {
    return this.form.controls.email;
  }
  get passwordCtrl() {
    return this.form.controls.password;
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId) || !environment.OAUTH_GOOGLE_CLIENT_ID) return;
    this.loadGsiScript().then(() => {
      (window as any).google.accounts.id.initialize({
        client_id: environment.OAUTH_GOOGLE_CLIENT_ID,
        callback: (res: { credential: string }) => this.handleGoogleCredential(res.credential),
      });
    });
  }

  private loadGsiScript(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).google?.accounts) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  private handleGoogleCredential(idToken: string) {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.loginService.loginWithGoogle({ idToken }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message ?? 'Google sign-in failed. Please try again.');
      },
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.form.value;

    this.loginService.login({ email: email!, password: password! }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(
          err?.error?.message ?? 'Login failed. Please check your email and password.',
        );
      },
    });
  }

  loginWithGoogle() {
    if (!environment.OAUTH_GOOGLE_CLIENT_ID) {
      this.errorMessage.set(
        'Google Sign-In belum dikonfigurasi. Isi GOOGLE_CLIENT_ID di environment.',
      );
      return;
    }
    (window as any).google?.accounts.id.prompt();
  }
}
