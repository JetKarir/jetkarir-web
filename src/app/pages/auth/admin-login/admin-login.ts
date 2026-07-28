import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentPerson, fluentLockClosed, fluentEye, fluentEyeOff, fluentArrowLeft } from '@ng-icons/fluent-ui';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, RouterLink, NgIcon],
  providers: [provideIcons({ fluentPerson, fluentLockClosed, fluentEye, fluentEyeOff, fluentArrowLeft })],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLoginPage {
  fb = inject(FormBuilder);
  router = inject(Router);

  loading = signal(false);
  showPassword = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    adminId: ['', Validators.required],
    password: ['', Validators.required],
  });

  get adminIdCtrl() { return this.form.controls.adminId; }
  get passwordCtrl() { return this.form.controls.password; }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    // Replace with real admin auth service call
    setTimeout(() => {
      this.loading.set(false);
      this.router.navigate(['/admin']);
    }, 1500);
  }
}
