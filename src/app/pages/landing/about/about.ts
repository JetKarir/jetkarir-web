import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentGauge, fluentShieldCheckmark, fluentArrowTrending } from '@ng-icons/fluent-ui';
import { SeoService } from '../../../core/services/seo/seo.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ fluentGauge, fluentShieldCheckmark, fluentArrowTrending })],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutPage {
  private seo = inject(SeoService);

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

  constructor() {
    this.seo.setPage({
      title: 'About JetKarir — Our Mission, Vision & Values',
      description:
        'Founded 2021. JetKarir is an AI-powered recruitment platform connecting 200K+ talents with 8K+ companies globally.',
      keywords:
        'about JetKarir, AI recruitment company, global hiring platform, JetKarir vision, JetKarir story',
      canonical: 'https://jetkarir.com/about',
      ogImage: '/images/logo_text_jetkarir.png',
    });

    this.seo.setJsonLd(
      {
        '@type': 'AboutPage',
        name: 'About JetKarir',
        url: 'https://jetkarir.com/about',
        description:
          'Founded 2021. JetKarir is an AI-powered recruitment platform connecting 200K+ talents with 8K+ companies globally.',
      },
      'page-ld',
    );
  }
}
