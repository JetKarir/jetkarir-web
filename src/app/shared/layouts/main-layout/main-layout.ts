import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/service/auth/auth-service';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, AvatarModule, BadgeModule, ToastModule],
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
    { label: 'Beranda', icon: 'pi pi-home', route: '/home' },
    { label: 'Cari Kerja', icon: 'pi pi-search', route: '/jobs' },
    { label: 'Lamaran', icon: 'pi pi-file', route: '/applications' },
    { label: 'Profil', icon: 'pi pi-user', route: '/profile' },
  ];

  logout() {
    this.authService.logout();
  }
}
