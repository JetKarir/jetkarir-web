import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentMail, fluentArrowLeft } from '@ng-icons/fluent-ui';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink, NgIcon],
  providers: [provideIcons({ fluentMail, fluentArrowLeft })],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPasswordPage {
  fb = inject(FormBuilder);

  loading = signal(false);
  submitted = signal(false);

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
    // Simulate sending reset link (replace with real service call)
    setTimeout(() => {
      this.loading.set(false);
      this.submitted.set(true);
    }, 1500);
  }
}
