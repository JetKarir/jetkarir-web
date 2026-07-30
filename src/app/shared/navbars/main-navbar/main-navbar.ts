import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentHome,
  fluentBriefcase,
  fluentAlert,
  fluentBookmark,
  fluentChat,
  fluentSettings,
  fluentAddCircle,
  fluentMoreCircle,
  fluentCompassNorthwest,
  fluentBuilding,
} from '@ng-icons/fluent-ui';
import { AuthService } from '../../../core/services/auth/auth-service';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-main-navbar',
  imports: [RouterLink, RouterLinkActive, NgIcon, AvatarModule],
  providers: [
    provideIcons({
      fluentHome,
      fluentBriefcase,
      fluentAlert,
      fluentBookmark,
      fluentChat,
      fluentSettings,
      fluentAddCircle,
      fluentMoreCircle,
      fluentCompassNorthwest,
      fluentBuilding,
    }),
  ],
  templateUrl: './main-navbar.html',
  styleUrl: './main-navbar.scss',
})
export class MainNavbar {
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

  userHandle = computed(() => {
    const email = this.user()?.email ?? '';
    return '@' + email.split('@')[0];
  });

  navItems = [
    { label: 'Home', icon: 'fluentHome', route: '/home' },
    { label: 'Explore', icon: 'fluentCompassNorthwest', route: '/explore' },
    { label: 'Jobs', icon: 'fluentBriefcase', route: '/jobs' },
    { label: 'Notif', icon: 'fluentAlert', route: '/notifications' },
    { label: 'Saved', icon: 'fluentBookmark', route: '/saved' },
    { label: 'Chat', icon: 'fluentChat', route: '/chat' },
    { label: 'Groups', icon: 'fluentBuilding', route: '/groups' },
    { label: 'Setting', icon: 'fluentSettings', route: '/settings' },
  ];

  logout() {
    this.authService.logout();
  }
}
