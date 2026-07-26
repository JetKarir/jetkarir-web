import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../../core/services/auth/register/register-service';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { LucideDynamicIcon, LucideCircleAlert } from '@lucide/angular';

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
    LucideDynamicIcon,
  ],
  providers: [MessageService],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterPage {
  protected readonly alertIcon = LucideCircleAlert;

  fb = inject(FormBuilder);
  router = inject(Router);
  registerService = inject(RegisterService);
  messageService = inject(MessageService);

  loading = signal(false);
  errorMessage = signal<string | null>(null);

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

  get fullNameCtrl() {
    return this.form.controls.fullName;
  }
  get emailCtrl() {
    return this.form.controls.email;
  }
  get passwordCtrl() {
    return this.form.controls.password;
  }
  get confirmPasswordCtrl() {
    return this.form.controls.confirmPassword;
  }
  get acceptTermsCtrl() {
    return this.form.controls.acceptTerms;
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
        next: () => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account created successfully. Please sign in.',
          });
          setTimeout(() => this.router.navigate(['/auth/login']), 1500);
        },
        error: (err) => {
          this.loading.set(false);
          const msg = err?.error?.message ?? 'Registration failed. Please try again.';
          this.errorMessage.set(msg);
        },
      });
  }
}
