import { Component } from '@angular/core';

@Component({
  selector: 'app-lp-stats',
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class LpStatsComponent {
  stats = [
    { value: '50K+', label: 'Published Jobs' },
    { value: '200K+', label: 'Registered User' },
    { value: '8K+', label: 'Partner Companies' },
    { value: '92%', label: 'Conversion Rate' },
  ];
}
