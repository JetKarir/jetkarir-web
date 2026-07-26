import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../core/services/main/job/job.service';
import { JobListItem, JobDetail } from '../../../core/models/interface/job.interface';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideBriefcase,
  LucideMapPin,
  LucideChevronLeft,
  LucideChevronRight,
  LucideSend,
} from '@lucide/angular';

@Component({
  selector: 'app-jobs',
  imports: [
    DecimalPipe,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    SkeletonModule,
    DialogModule,
    TagModule,
    LucideDynamicIcon,
  ],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})
export class JobsPage implements OnInit {
  jobService = inject(JobService);
  messageService = inject(MessageService);

  jobs = signal<JobListItem[]>([]);
  loading = signal(true);
  total = signal(0);
  page = signal(1);
  limit = 12;

  keyword = signal('');
  searchInput = '';
  cityFilter = '';
  workModeFilterId: number | null = null;

  workModeOptions: { label: string; value: number | null }[] = [
    { label: 'All Modes', value: null },
  ];

  selectedJobId = signal<string | null>(null);
  selectedJob = signal<JobDetail | null>(null);
  loadingDetail = signal(false);
  showDetail = signal(false);

  searchIcon = LucideSearch;
  briefcaseIcon = LucideBriefcase;
  mapPinIcon = LucideMapPin;
  chevronLeftIcon = LucideChevronLeft;
  chevronRightIcon = LucideChevronRight;
  sendIcon = LucideSend;

  totalPages = computed(() => Math.ceil(this.total() / this.limit));

  ngOnInit() {
    this.loadJobs();
    this.jobService.getMasterData('work-modes').subscribe({
      next: (res) => {
        this.workModeOptions = [
          { label: 'All Modes', value: null },
          ...res.data.map((item) => ({ label: item.name, value: item.id })),
        ];
      },
    });
  }

  loadJobs() {
    this.loading.set(true);
    this.jobService
      .searchJobs({
        page: this.page(),
        limit: this.limit,
        q: this.keyword() || undefined,
        city: this.cityFilter || undefined,
        workModeIds: this.workModeFilterId !== null ? [this.workModeFilterId] : undefined,
      })
      .subscribe({
        next: (res) => {
          this.jobs.set(res.data ?? []);
          this.total.set(res.meta?.total ?? 0);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Failed to load jobs.',
          });
        },
      });
  }

  search() {
    this.keyword.set(this.searchInput);
    this.page.set(1);
    this.loadJobs();
  }

  onFilterChange() {
    this.page.set(1);
    this.loadJobs();
  }

  goToPage(p: number) {
    this.page.set(p);
    this.loadJobs();
  }

  openDetail(jobId: string) {
    this.selectedJobId.set(jobId);
    this.selectedJob.set(null);
    this.showDetail.set(true);
    this.loadingDetail.set(true);
    this.jobService.getJobDetail(jobId).subscribe({
      next: (res) => {
        this.selectedJob.set(res.data);
        this.loadingDetail.set(false);
      },
      error: () => this.loadingDetail.set(false),
    });
  }

  closeDetail() {
    this.showDetail.set(false);
    this.selectedJobId.set(null);
    this.selectedJob.set(null);
  }

  applyJob() {
    const jobId = this.selectedJobId();
    if (!jobId) return;
    this.jobService.applyJob(jobId, { sourceCode: 'MANUAL', consentAiProcessing: true }).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Application submitted successfully!',
        });
        this.closeDetail();
      },
      error: (err) => {
        const msg = err?.error?.message ?? 'Failed to apply. Please try again.';
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: msg });
      },
    });
  }

  skeletons = Array(12).fill(0);
}
