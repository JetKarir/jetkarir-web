import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthFooterComponent } from '../../reusables/auth-footer/auth-footer';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthFooterComponent],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {}
