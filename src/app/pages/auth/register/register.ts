import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/service/auth/auth-service';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password || !confirmPassword) return null;
  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  messageService = inject(MessageService);

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+62|62|0)8[1-9][0-9]{6,10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    },
    { validators: passwordMatchValidator }
  );

  get fullNameCtrl() { return this.form.controls.fullName; }
  get emailCtrl() { return this.form.controls.email; }
  get phoneCtrl() { return this.form.controls.phone; }
  get passwordCtrl() { return this.form.controls.password; }
  get confirmPasswordCtrl() { return this.form.controls.confirmPassword; }
  get acceptTermsCtrl() { return this.form.controls.acceptTerms; }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    const { fullName, email, phone, password } = this.form.value;

    this.authService
      .register({ fullName: fullName!, email: email!, phone: phone!, password: password!, acceptTerms: true })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Berhasil',
            detail: 'Akun berhasil dibuat. Silakan masuk.',
          });
          setTimeout(() => this.router.navigate(['/auth/login']), 1500);
        },
        error: (err) => {
          this.loading.set(false);
          const msg = err?.error?.message ?? 'Pendaftaran gagal. Silakan coba lagi.';
          this.errorMessage.set(msg);
        },
      });
  }
}
