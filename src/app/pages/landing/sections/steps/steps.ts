import { Component } from '@angular/core';

@Component({
  selector: 'app-lp-steps',
  templateUrl: './steps.html',
  styleUrl: './steps.scss',
})
export class LpStepsComponent {
  steps = [
    {
      num: '01',
      title: 'Create Profile',
      desc: 'Complete your profile in 5 minutes and let AI optimize how you appear.',
    },
    {
      num: '02',
      title: 'Find Jobs',
      desc: 'Explore thousands of openings or let AI recommendations work for you.',
    },
    {
      num: '03',
      title: 'Apply & Track',
      desc: 'Apply easily and track your application progress in real time.',
    },
  ];
}
