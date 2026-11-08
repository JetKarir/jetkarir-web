import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentDocumentEdit, fluentStar } from '@ng-icons/fluent-ui';
import { HttpClient } from '@angular/common/http';
import { CandidateService } from '../../../core/services/main/candidate/candidate.service';
import { Application } from '../../../core/models/interface/application.interface';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-main-widget',
  imports: [RouterLink, NgIcon, SkeletonModule],
  providers: [provideIcons({ fluentDocumentEdit, fluentStar })],
  templateUrl: './main-widget.html',
  styleUrl: './main-widget.scss',
})
export class MainWidget implements OnInit {
  private candidateService = inject(CandidateService);
  private http = inject(HttpClient);

  applications = signal<Application[]>([]);
  loadingApps = signal(true);

  careerTrends = signal<{ title: string; count: string }[]>([]);
  recentActivities = signal<{ id: number; jobTitle: string; companyName: string; timeAgo: string }[]>([]);
  recommendedCompanies = signal<{ name: string; sector: string }[]>([]);

  timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return mins <= 1 ? 'Just now' : `${mins} minutes ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 5) return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  ngOnInit() {
    this.http.get<{ title: string; count: string }[]>('/json/career-trends.json').subscribe({
      next: (data) => this.careerTrends.set(data.slice(0, 2)),
      error: () => {},
    });

    this.http.get<{ id: number; jobTitle: string; companyName: string; timeAgo: string }[]>('/json/recent-activities.json').subscribe({
      next: (data) => this.recentActivities.set(data.slice(0, 2)),
      error: () => {},
    });

    this.http.get<{ name: string; sector: string }[]>('/json/recommended-companies.json').subscribe({
      next: (data) => this.recommendedCompanies.set(data.slice(0, 2)),
      error: () => {},
    });

    this.candidateService.getApplications().subscribe({
      next: (res) => {
        this.applications.set((res.data ?? []).slice(0, 2));
        this.loadingApps.set(false);
      },
      error: () => this.loadingApps.set(false),
    });
  }
}
