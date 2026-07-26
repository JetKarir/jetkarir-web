import { Component } from '@angular/core';
import { LpHeroComponent } from './sections/hero/hero';
import { LpStatsComponent } from './sections/stats/stats';
import { LpFeaturesComponent } from './sections/features/features';
import { LpCtaComponent } from './sections/cta/cta';

@Component({
  selector: 'app-landing',
  imports: [LpHeroComponent, LpStatsComponent, LpFeaturesComponent, LpCtaComponent],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingPage {}
