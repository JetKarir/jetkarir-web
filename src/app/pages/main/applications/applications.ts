import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CandidateService } from '../../../core/service/main/candidate/candidate.service';
import { Application } from '../../../core/model/interface/application.interface';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { TimelineModule } from 'primeng/timeline';
import {
  LucideDynamicIcon,
  LucideFilePenLine,
  LucideMapPin,
  LucideSend,
  LucideFileCheck,
  LucidePencil,
  LucideMessagesSquare,
  LucideStar,
  LucideCircleCheckBig,
  LucideCircleX,
  LucideCircle,
} from '@lucide/angular';

@Component({
  selector: 'app-applications',
  imports: [DatePipe, TagModule, SkeletonModule, TimelineModule, LucideDynamicIcon],
  templateUrl: './applications.html',
  styleUrl: './applications.scss',
})
export class ApplicationsPage implements OnInit {
  candidateService = inject(CandidateService);

  applications = signal<Application[]>([]);
  loading = signal(true);
  selected = signal<Application | null>(null);

  ngOnInit() {
    this.candidateService.getApplications().subscribe({
      next: (res) => {
        this.applications.set(res.data ?? []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  select(app: Application) {
    this.selected.set(this.selected()?.id === app.id ? null : app);
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
      SCREENING: 'Document Screening',
      ASSESSMENT: 'Assessment',
      INTERVIEW: 'Interview',
      OFFERED: 'Offered',
      HIRED: 'Hired',
      REJECTED: 'Rejected',
      WITHDRAWN: 'Withdrawn',
    };
    return map[status] ?? status;
  }

  emptyApplicationIcon = LucideFilePenLine;
  mapPinIcon = LucideMapPin;

  stageIcon(stageName: string) {
    const map = {
      APPLIED: LucideSend,
      SCREENING: LucideFileCheck,
      ASSESSMENT: LucidePencil,
      INTERVIEW: LucideMessagesSquare,
      OFFERED: LucideStar,
      HIRED: LucideCircleCheckBig,
      REJECTED: LucideCircleX,
    };
    const key = stageName.toUpperCase() as keyof typeof map;
    return map[key] ?? LucideCircle;
  }

  skeletons = Array(4).fill(0);
}
