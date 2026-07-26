import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-landing-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './landing-navbar.html',
  styleUrl: './landing-navbar.scss',
})
export class LandingNavbarComponent {}
