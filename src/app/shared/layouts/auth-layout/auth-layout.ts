import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LucideDynamicIcon, LucideArrowLeft } from '@lucide/angular';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, RouterLink, LucideDynamicIcon],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  protected readonly backIcon = LucideArrowLeft;
}
