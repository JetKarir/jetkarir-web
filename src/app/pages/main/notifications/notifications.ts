import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CandidateService } from '../../../core/service/main/candidate/candidate.service';
import { NotificationItem } from '../../../core/model/interface/application.interface';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-notifications',
  imports: [DatePipe, ButtonModule, SkeletonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class NotificationsPage implements OnInit {
  candidateService = inject(CandidateService);

  notifications = signal<NotificationItem[]>([]);
  loading = signal(true);

  unreadCount = computed(() => this.notifications().filter((n) => !n.isRead).length);

  ngOnInit() {
    this.candidateService.getNotifications().subscribe({
      next: (res) => {
        this.notifications.set(res.data ?? []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  markRead(id: string) {
    this.candidateService.markNotificationRead(id).subscribe({
      next: () => {
        this.notifications.update((list) =>
          list.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
      },
    });
  }

  markAllRead() {
    this.candidateService.markAllRead().subscribe({
      next: () => {
        this.notifications.update((list) => list.map((n) => ({ ...n, isRead: true })));
      },
    });
  }

  typeIcon(type: string) {
    const map: Record<string, string> = {
      APPLICATION_UPDATE: 'pi pi-file-check',
      INTERVIEW_INVITATION: 'pi pi-comments',
      OFFER: 'pi pi-star',
      REJECTION: 'pi pi-times-circle',
      SYSTEM: 'pi pi-info-circle',
    };
    return map[type] ?? 'pi pi-bell';
  }

  skeletons = Array(5).fill(0);
}
