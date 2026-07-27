import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentLockClosed, fluentEye, fluentEyeOff, fluentArrowLeft } from '@ng-icons/fluent-ui';

function passwordMatchValidator(control: AbstractControl) {
  const pw = control.get('password');
  const confirm = control.get('confirmPassword');
  if (!pw || !confirm) return null;
  return pw.value === confirm.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterLink, NgIcon],
  providers: [provideIcons({ fluentLockClosed, fluentEye, fluentEyeOff, fluentArrowLeft })],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPasswordPage {
  fb = inject(FormBuilder);
  router = inject(Router);

  loading = signal(false);
  done = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  form = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator },
  );

  get passwordCtrl() { return this.form.controls.password; }
  get confirmPasswordCtrl() { return this.form.controls.confirmPassword; }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    // Replace with real reset password service call
    setTimeout(() => {
      this.loading.set(false);
      this.done.set(true);
      setTimeout(() => this.router.navigate(['/auth/login']), 2000);
    }, 1500);
  }
}
