import { Component } from '@angular/core';
import { LpHeroComponent } from './sections/hero/hero';
import { LpCompaniesComponent } from './sections/companies/companies';
import { LpStatsComponent } from './sections/stats/stats';
import { LpFeaturesComponent } from './sections/features/features';
import { LpStepsComponent } from './sections/steps/steps';
import { LpCtaComponent } from './sections/cta/cta';
import { LpFooterComponent } from './sections/footer/footer';

@Component({
  selector: 'app-landing',
  imports: [
    LpHeroComponent,
    LpCompaniesComponent,
    LpStatsComponent,
    LpFeaturesComponent,
    LpStepsComponent,
    LpCtaComponent,
    LpFooterComponent,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingPage {}
