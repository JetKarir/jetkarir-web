import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  signal,
  AfterViewInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentArrowLeft } from '@ng-icons/fluent-ui';

@Component({
  selector: 'app-verify-email',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ fluentArrowLeft })],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmailPage implements AfterViewInit {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  loading = signal(false);
  verified = signal(false);
  digits: string[] = Array(6).fill('');

  ngAfterViewInit() {
    this.inputs.first?.nativeElement.focus();
  }

  onInput(event: Event, index: number) {
    const el = event.target as HTMLInputElement;
    const val = el.value.replace(/\D/g, '').slice(-1);
    el.value = val;
    this.digits[index] = val;
    if (val && index < 5) {
      this.inputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.digits[index] && index > 0) {
      const prev = this.inputs.toArray()[index - 1].nativeElement;
      this.digits[index - 1] = '';
      prev.value = '';
      prev.focus();
    }
  }

  onPaste(event: ClipboardEvent, startIndex: number) {
    event.preventDefault();
    const paste = (event.clipboardData?.getData('text') ?? '')
      .replace(/\D/g, '')
      .slice(0, 6 - startIndex);
    const arr = this.inputs.toArray();
    [...paste].forEach((d, i) => {
      const idx = startIndex + i;
      this.digits[idx] = d;
      arr[idx].nativeElement.value = d;
    });
    const lastFocus = Math.min(startIndex + paste.length, 5);
    arr[lastFocus].nativeElement.focus();
  }

  get otpValue() {
    return this.digits.join('');
  }

  submit() {
    if (this.otpValue.length < 6) return;
    this.loading.set(true);
    // Replace with real OTP verification service call
    setTimeout(() => {
      this.loading.set(false);
      this.verified.set(true);
    }, 1500);
  }

  resend() {
    // Replace with real resend OTP service call
  }
}
