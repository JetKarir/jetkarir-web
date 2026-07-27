import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentHome,
  fluentSearch,
  fluentDocumentText,
  fluentPerson,
  fluentAlert,
  fluentSignOut,
} from '@ng-icons/fluent-ui';
import { AuthService } from '../../../core/services/auth/auth-service';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    AvatarModule,
    BadgeModule,
    ToastModule,
    NgIcon,
  ],
  providers: [
    MessageService,
    provideIcons({ fluentHome, fluentSearch, fluentDocumentText, fluentPerson, fluentAlert, fluentSignOut }),
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  authService = inject(AuthService);

  user = this.authService.currentUser;

  userInitials = computed(() => {
    const name = this.user()?.fullName ?? '';
    return name
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  });

  navItems = [
    { label: 'Home', icon: 'fluentHome', route: '/home' },
    { label: 'Jobs', icon: 'fluentSearch', route: '/jobs' },
    { label: 'Applications', icon: 'fluentDocumentText', route: '/applications' },
    { label: 'Profile', icon: 'fluentPerson', route: '/profile' },
  ];

  notificationIcon = 'fluentAlert';
  logoutIcon = 'fluentSignOut';

  logout() {
    this.authService.logout();
  }
}
