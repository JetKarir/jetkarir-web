import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/service/auth/auth-service';
import { JobService } from '../../../core/service/main/job/job.service';
import { CandidateService } from '../../../core/service/main/candidate/candidate.service';
import { JobListItem } from '../../../core/model/interface/job.interface';
import { Application } from '../../../core/model/interface/application.interface';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe, RouterLink, ButtonModule, CardModule, TagModule, SkeletonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage implements OnInit {
  authService = inject(AuthService);
  jobService = inject(JobService);
  candidateService = inject(CandidateService);

  user = this.authService.currentUser;
  firstName = computed(() => this.user()?.fullName?.split(' ')[0] ?? 'Pengguna');

  jobs = signal<JobListItem[]>([]);
  applications = signal<Application[]>([]);
  loadingJobs = signal(true);
  loadingApps = signal(true);

  get greeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
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
      APPLIED: 'Dilamar',
      PROCESSING: 'Diproses',
      SCREENING: 'Seleksi',
      ASSESSMENT: 'Tes',
      INTERVIEW: 'Interview',
      OFFERED: 'Ditawarkan',
      HIRED: 'Diterima',
      REJECTED: 'Ditolak',
      WITHDRAWN: 'Ditarik',
    };
    return map[status] ?? status;
  }
}
