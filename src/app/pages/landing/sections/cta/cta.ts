import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon, LucideArrowRight } from '@lucide/angular';

@Component({
  selector: 'app-lp-cta',
  imports: [RouterLink, LucideDynamicIcon],
  templateUrl: './cta.html',
  styleUrl: './cta.scss',
})
export class LpCtaComponent {
  protected readonly arrowRightIcon = LucideArrowRight;
}
