import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth-service';
import { JobService } from '../../../core/services/main/job/job.service';
import { CandidateService } from '../../../core/services/main/candidate/candidate.service';
import { JobListItem } from '../../../core/models/interface/job.interface';
import { Application } from '../../../core/models/interface/application.interface';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideFilePenLine,
  LucideBriefcase,
} from '@lucide/angular';

@Component({
  selector: 'app-home',
  imports: [
    DecimalPipe,
    RouterLink,
    ButtonModule,
    CardModule,
    TagModule,
    SkeletonModule,
    LucideDynamicIcon,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage implements OnInit {
  authService = inject(AuthService);
  jobService = inject(JobService);
  candidateService = inject(CandidateService);

  user = this.authService.currentUser;
  firstName = computed(() => this.user()?.fullName?.split(' ')[0] ?? 'User');

  jobs = signal<JobListItem[]>([]);
  applications = signal<Application[]>([]);
  loadingJobs = signal(true);
  loadingApps = signal(true);

  searchIcon = LucideSearch;
  applicationIcon = LucideFilePenLine;
  briefcaseIcon = LucideBriefcase;

  appliedCount = computed(
    () => this.applications().filter((application) => application.status === 'APPLIED').length,
  );
  savedCount = computed(() => Math.min(this.jobs().length, 3));
  inProgressCount = computed(
    () =>
      this.applications().filter((application) =>
        ['PROCESSING', 'SCREENING', 'ASSESSMENT', 'INTERVIEW'].includes(application.status),
      ).length,
  );
  acceptedCount = computed(
    () =>
      this.applications().filter((application) => ['OFFERED', 'HIRED'].includes(application.status))
        .length,
  );

  get greeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 15) return 'Good Afternoon';
    if (hour < 18) return 'Good Evening';
    return 'Good Night';
  }

  ngOnInit() {
    this.jobService.searchJobs({ page: 1, limit: 6 }).subscribe({
      next: (res) => {
        this.jobs.set(res.data ?? []);
        this.loadingJobs.set(false);
      },
      error: () => this.loadingJobs.set(false),
    });

    this.candidateService.getApplications().subscribe({
      next: (res) => {
        this.applications.set((res.data ?? []).slice(0, 3));
        this.loadingApps.set(false);
      },
      error: () => this.loadingApps.set(false),
    });
  }

  statusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    const map: Record<string, 'success' | 'info' | 'warn' | 'danger' | 'secondary'> = {
      APPLIED: 'info',
      PROCESSING: 'info',
      SCREENING: 'warn',
      ASSESSMENT: 'warn',
      INTERVIEW: 'warn',
      OFFERED: 'success',
      HIRED: 'success',
      REJECTED: 'danger',
      WITHDRAWN: 'secondary',
    };
    return map[status] ?? 'secondary';
  }

  statusLabel(status: string) {
    const map: Record<string, string> = {
      APPLIED: 'Applied',
      PROCESSING: 'Processing',
      SCREENING: 'Screening',
      ASSESSMENT: 'Assessment',
      INTERVIEW: 'Interview',
      OFFERED: 'Offered',
      HIRED: 'Hired',
      REJECTED: 'Rejected',
      WITHDRAWN: 'Withdrawn',
    };
    return map[status] ?? status;
  }
}
