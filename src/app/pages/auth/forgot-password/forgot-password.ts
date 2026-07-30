import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentMail, fluentArrowLeft, fluentErrorCircle } from '@ng-icons/fluent-ui';
import { ForgotPasswordService } from '../../../core/services/auth/forgot-password/forgot-password-service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink, NgIcon],
  providers: [provideIcons({ fluentMail, fluentArrowLeft, fluentErrorCircle })],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPasswordPage {
  private fb = inject(FormBuilder);
  private forgotPasswordService = inject(ForgotPasswordService);

  loading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get emailCtrl() { return this.form.controls.email; }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.forgotPasswordService.forgotPassword(this.form.value.email!).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.successMessage.set(res.message);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message ?? 'Failed to send reset link. Please try again.');
      },
    });
  }
}
