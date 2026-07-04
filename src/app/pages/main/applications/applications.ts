import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CandidateService } from '../../../core/service/main/candidate/candidate.service';
import { Application } from '../../../core/model/interface/application.interface';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-applications',
  imports: [DatePipe, TagModule, SkeletonModule, TimelineModule],
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
      APPLIED: 'Dilamar',
      PROCESSING: 'Diproses',
      SCREENING: 'Seleksi Berkas',
      ASSESSMENT: 'Tes',
      INTERVIEW: 'Interview',
      OFFERED: 'Penawaran',
      HIRED: 'Diterima',
      REJECTED: 'Ditolak',
      WITHDRAWN: 'Ditarik',
    };
    return map[status] ?? status;
  }

  stageIcon(stageName: string) {
    const map: Record<string, string> = {
      APPLIED: 'pi pi-send',
      SCREENING: 'pi pi-file-check',
      ASSESSMENT: 'pi pi-pencil',
      INTERVIEW: 'pi pi-comments',
      OFFERED: 'pi pi-star',
      HIRED: 'pi pi-check-circle',
      REJECTED: 'pi pi-times-circle',
    };
    const key = stageName.toUpperCase();
    return map[key] ?? 'pi pi-circle';
  }

  skeletons = Array(4).fill(0);
}
