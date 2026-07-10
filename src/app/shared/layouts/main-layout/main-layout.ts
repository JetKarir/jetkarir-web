import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/service/auth/auth-service';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  LucideDynamicIcon,
  LucideHome,
  LucideSearch,
  LucideFileText,
  LucideUser,
  LucideBell,
  LucideLogOut,
} from '@lucide/angular';

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
    LucideDynamicIcon,
  ],
  providers: [MessageService],
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
    { label: 'Home', icon: LucideHome, route: '/home' },
    { label: 'Jobs', icon: LucideSearch, route: '/jobs' },
    { label: 'Applications', icon: LucideFileText, route: '/applications' },
    { label: 'Profile', icon: LucideUser, route: '/profile' },
  ];

  notificationIcon = LucideBell;
  logoutIcon = LucideLogOut;

  logout() {
    this.authService.logout();
  }
}
