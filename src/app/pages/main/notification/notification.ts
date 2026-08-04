import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentCheckmarkCircle,
  fluentAlertOff,
  fluentTaskListSquareLtr,
  fluentChat,
  fluentStar,
  fluentDismissCircle,
  fluentInfo,
  fluentAlert,
  fluentSettings,
} from '@ng-icons/fluent-ui';
import { CandidateService } from '../../../core/services/main/candidate/candidate.service';
import { NotificationItem } from '../../../core/models/interface/application.interface';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { MainWidget } from '../../../shared/reusables/main-widget/main-widget';

@Component({
  selector: 'app-notifications',
  imports: [DatePipe, ButtonModule, SkeletonModule, NgIcon, MainWidget],
  providers: [
    provideIcons({
      fluentCheckmarkCircle,
      fluentAlertOff,
      fluentTaskListSquareLtr,
      fluentChat,
      fluentStar,
      fluentDismissCircle,
      fluentInfo,
      fluentAlert,
      fluentSettings,
    }),
  ],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
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
          list.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
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

  markAllReadIcon = 'fluentCheckmarkCircle';
  emptyBellIcon = 'fluentAlertOff';

  typeIcon(type: string): string {
    const map: Record<string, string> = {
      APPLICATION_UPDATE: 'fluentTaskListSquareLtr',
      INTERVIEW_INVITATION: 'fluentChat',
      OFFER: 'fluentStar',
      REJECTION: 'fluentDismissCircle',
      SYSTEM: 'fluentInfo',
    };
    return map[type] ?? 'fluentAlert';
  }

  skeletons = Array(5).fill(0);
}
