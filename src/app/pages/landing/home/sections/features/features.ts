import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentDocumentText,
  fluentRocket,
  fluentMic,
  fluentThumbLike,
  fluentDataBarVertical,
  fluentPeopleCommunity,
} from '@ng-icons/fluent-ui';

@Component({
  selector: 'app-lp-features',
  imports: [NgIcon],
  providers: [provideIcons({ fluentDocumentText, fluentRocket, fluentMic, fluentThumbLike, fluentDataBarVertical, fluentPeopleCommunity })],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class LpFeaturesComponent {
  candidateFeatures = [
    {
      icon: 'fluentDocumentText',
      title: 'AI-Resume Builder',
      desc: 'Create a professional, ATS-optimized resume in minutes. Our AI highlights your best skills to help you stand out to top recruiters.',
    },
    {
      icon: 'fluentRocket',
      title: 'AI-Auto Apply',
      desc: 'Let our AI handle applications for you. Automatically apply to matching roles with your profile to land interviews faster.',
    },
    {
      icon: 'fluentMic',
      title: 'AI-Personalized Feedback',
      desc: 'Receive constructive, AI-driven insights after every interview or test to refine your approach and secure your dream role.',
    },
  ];

  enterpriseFeatures = [
    {
      icon: 'fluentThumbLike',
      title: 'Candidates Recommendation',
      desc: 'AI-driven matching surfaces the top 5% of talent instantly, ensuring high-quality hires with precision logic.',
    },
    {
      icon: 'fluentDataBarVertical',
      title: 'Powerful Analytics',
      desc: 'Our AI analyzes candidate data from resumes, tests, and interviews. It summarizes deep insights tailored to recruiter needs.',
    },
    {
      icon: 'fluentPeopleCommunity',
      title: 'Automated Recruitment',
      desc: 'Our AI automates the end-to-end recruitment loop by seamlessly scheduling multi-stage tests and interviews at scale.',
    },
  ];
}
