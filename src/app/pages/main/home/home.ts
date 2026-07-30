import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentSearch,
  fluentBriefcase,
  fluentDismiss,
  fluentBookmark,
  fluentCheckmark,
  fluentFilter,
} from '@ng-icons/fluent-ui';
import { AuthService } from '../../../core/services/auth/auth-service';
import { JobService } from '../../../core/services/main/job/job.service';
import { JobListItem } from '../../../core/models/interface/job.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { MainWidget } from '../../../shared/reusables/main-widget/main-widget';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe, RouterLink, SkeletonModule, NgIcon, MainWidget],
  providers: [
    provideIcons({
      fluentSearch,
      fluentBriefcase,
      fluentDismiss,
      fluentBookmark,
      fluentCheckmark,
      fluentFilter,
    }),
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage implements OnInit {
  private jobService = inject(JobService);
  authService = inject(AuthService);

  user = this.authService.currentUser;

  jobs = signal<JobListItem[]>([]);
  loadingJobs = signal(true);

  currentIndex = signal(0);
  searchQuery = signal('');

  currentJob = computed(() => this.jobs()[this.currentIndex()] ?? null);
  matchPercent = computed(() => {
    if (!this.currentJob()) return null;
    return [98, 94, 87, 92, 89, 95][this.currentIndex() % 6];
  });

  discardJob() {
    if (this.currentJob()) this.currentIndex.update((i) => i + 1);
  }

  saveJob() {
    if (this.currentJob()) this.currentIndex.update((i) => i + 1);
  }

  applyJob() {
    if (this.currentJob()) this.currentIndex.update((i) => i + 1);
  }

  ngOnInit() {
    this.jobService.searchJobs({ page: 1, limit: 6 }).subscribe({
      next: (res) => {
        this.jobs.set(res.data ?? []);
        this.loadingJobs.set(false);
      },
      error: () => this.loadingJobs.set(false),
    });
  }
}
