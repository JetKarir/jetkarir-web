import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentDocumentEdit } from '@ng-icons/fluent-ui';
import { CandidateService } from '../../../core/services/main/candidate/candidate.service';
import { Application } from '../../../core/models/interface/application.interface';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-main-widget',
  imports: [RouterLink, NgIcon, SkeletonModule],
  providers: [provideIcons({ fluentDocumentEdit })],
  templateUrl: './main-widget.html',
  styleUrl: './main-widget.scss',
})
export class MainWidget implements OnInit {
  private candidateService = inject(CandidateService);

  applications = signal<Application[]>([]);
  loadingApps = signal(true);

  careerTrends = [
    { title: 'AI Engineer', count: '1.2k' },
    { title: 'Data Analyst', count: '850' },
    { title: 'Product Manager', count: '720' },
  ];

  recommendedCompanies = [
    { name: 'FinTech Inc.', sector: 'Banking & Finance' },
    { name: 'GreenEnergy Corp', sector: 'Sustainability' },
  ];

  ngOnInit() {
    this.candidateService.getApplications().subscribe({
      next: (res) => {
        this.applications.set((res.data ?? []).slice(0, 3));
        this.loadingApps.set(false);
      },
      error: () => this.loadingApps.set(false),
    });
  }
}
