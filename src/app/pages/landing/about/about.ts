import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentGauge, fluentShieldCheckmark, fluentArrowTrending } from '@ng-icons/fluent-ui';

@Component({
  selector: 'app-about',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ fluentGauge, fluentShieldCheckmark, fluentArrowTrending })],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutPage {
  coreValues = [
    {
      icon: 'fluentGauge',
      title: 'Velocity',
      desc: 'Speed in matching talent with enterprise roles, minimizing downtime and maximizing output.',
    },
    {
      icon: 'fluentShieldCheckmark',
      title: 'Trust',
      desc: 'Unwavering commitment to data privacy, ethical AI practices, and institutional reliability.',
    },
    {
      icon: 'fluentArrowTrending',
      title: 'Growth',
      desc: 'Driving long-term career success and enterprise expansion through strategic alignment.',
    },
  ];
}
