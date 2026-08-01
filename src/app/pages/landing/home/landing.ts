import { Component, inject } from '@angular/core';
import { LpHeroComponent } from './sections/hero/hero';
import { LpStatsComponent } from './sections/stats/stats';
import { LpFeaturesComponent } from './sections/features/features';
import { LpCtaComponent } from './sections/cta/cta';
import { SeoService } from '../../../core/services/seo/seo.service';

@Component({
  selector: 'app-landing',
  imports: [LpHeroComponent, LpStatsComponent, LpFeaturesComponent, LpCtaComponent],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingPage {
  private seo = inject(SeoService);

  constructor() {
    this.seo.setPage({
      title: 'JetKarir — AI-Powered Global Recruitment Platform',
      description:
        "Find your dream job with JetKarir's AI platform. AI Resume Builder, Auto Apply, and personalized feedback. 50K+ jobs, 200K+ users worldwide.",
      keywords:
        'AI recruitment, job platform, AI resume builder, auto apply, global hiring, career platform, lowongan kerja AI, platform rekrutmen',
      canonical: 'https://jetkarir.com/',
      ogImage: '/images/foto_landing_hero.jpg',
    });

    this.seo.setJsonLd(
      {
        '@type': 'WebPage',
        name: 'JetKarir — AI-Powered Global Recruitment Platform',
        url: 'https://jetkarir.com/',
        description:
          "Find your dream job with JetKarir's AI platform. AI Resume Builder, Auto Apply, and personalized feedback.",
      },
      'page-ld',
    );
  }
}
