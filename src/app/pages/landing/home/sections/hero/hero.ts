import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentArrowRight, fluentSparkle } from '@ng-icons/fluent-ui';

@Component({
  selector: 'app-lp-hero',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ fluentArrowRight, fluentSparkle })],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class LpHeroComponent {}
