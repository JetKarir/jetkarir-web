import { Component, inject, signal, AfterViewInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentErrorCircle, fluentEye, fluentEyeOff, fluentArrowLeft } from '@ng-icons/fluent-ui';
import { RegisterService } from '../../../core/services/auth/register/register-service';
import { LoginService } from '../../../core/services/auth/login/login-service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { environment } from '../../../../environments/environment';
import { GsiService } from '../../../core/services/auth/gsi-service';

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password || !confirmPassword) return null;
  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ToastModule, NgIcon],
  providers: [
    MessageService,
    provideIcons({ fluentErrorCircle, fluentEye, fluentEyeOff, fluentArrowLeft }),
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterPage implements AfterViewInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private registerService = inject(RegisterService);
  private loginService = inject(LoginService);
  private messageService = inject(MessageService);
  private gsi = inject(GsiService);

  loading = signal(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  form = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    },
    { validators: passwordMatchValidator },
  );

  get fullNameCtrl() { return this.form.controls.fullName; }
  get emailCtrl() { return this.form.controls.email; }
  get passwordCtrl() { return this.form.controls.password; }
  get confirmPasswordCtrl() { return this.form.controls.confirmPassword; }
  get acceptTermsCtrl() { return this.form.controls.acceptTerms; }

  ngAfterViewInit() {
    this.gsi.init((idToken) => this.handleGoogleCredential(idToken));
  }

  private handleGoogleCredential(idToken: string) {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.loginService.loginWithGoogle({ idToken }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/']);
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

    const { fullName, email, password, acceptTerms } = this.form.value;

    this.registerService
      .register({
        fullName: fullName!,
        email: email!,
        password: password!,
        acceptTerms: acceptTerms!,
      })
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: res.message,
            life: 3000,
          });
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMessage.set(err?.error?.message ?? 'Registration failed. Please try again.');
        },
      });
  }

  registerWithGoogle() {
    if (!environment.OAUTH_GOOGLE_CLIENT_ID) {
      this.errorMessage.set(
        'Google Sign-In belum dikonfigurasi. Isi GOOGLE_CLIENT_ID di environment.',
      );
      return;
    }
    this.gsi.prompt();
  }
}
