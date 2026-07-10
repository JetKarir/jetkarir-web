import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideDynamicIcon,
  LucideSparkles,
  LucideArrowRight,
  LucideCircleCheckBig,
  LucideBell,
} from '@lucide/angular';

@Component({
  selector: 'app-lp-hero',
  imports: [RouterLink, LucideDynamicIcon],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class LpHeroComponent {
  protected readonly sparklesIcon = LucideSparkles;
  protected readonly arrowRightIcon = LucideArrowRight;
  protected readonly checkCircleIcon = LucideCircleCheckBig;
  protected readonly bellIcon = LucideBell;
}
