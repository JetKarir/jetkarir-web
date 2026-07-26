import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingNavbarComponent } from '../../navbars/landing-navbar/landing-navbar';
import { LandingFooterComponent } from '../../reusables/landing-footer/landing-footer';

@Component({
  selector: 'app-landing-layout',
  imports: [RouterOutlet, LandingNavbarComponent, LandingFooterComponent],
  templateUrl: './landing-layout.html',
  styleUrl: './landing-layout.scss',
})
export class LandingLayout {}
