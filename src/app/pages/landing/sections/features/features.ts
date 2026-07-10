import { Component } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideBolt,
  LucideSendHorizontal,
  LucideChartColumn,
  LucideShieldCheck,
} from '@lucide/angular';

@Component({
  selector: 'app-lp-features',
  imports: [LucideDynamicIcon],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class LpFeaturesComponent {
  features = [
    {
      icon: LucideBolt,
      title: 'Smart AI Matching',
      desc: 'Our AI algorithm matches your profile with the most relevant job opportunities in real time.',
    },
    {
      icon: LucideSendHorizontal,
      title: 'Auto Apply',
      desc: 'Apply to multiple jobs with one click. Save time and increase your chances.',
    },
    {
      icon: LucideChartColumn,
      title: 'Track Progress',
      desc: 'Track all your application statuses in one dashboard. Never miss an update.',
    },
    {
      icon: LucideShieldCheck,
      title: 'Secure Data',
      desc: 'Your profile and personal data are encrypted and only shared with your permission.',
    },
  ];
}
