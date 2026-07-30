import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentHome, fluentBriefcase, fluentDocumentText, fluentAlert, fluentPerson } from '@ng-icons/fluent-ui';
import { AuthService } from '../../../core/services/auth/auth-service';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MainNavbar } from '../../navbars/main-navbar/main-navbar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AvatarModule, ToastModule, NgIcon, MainNavbar],
  providers: [MessageService, provideIcons({ fluentHome, fluentBriefcase, fluentDocumentText, fluentAlert, fluentPerson })],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  authService = inject(AuthService);

  user = this.authService.currentUser;

  userInitials = computed(() => {
    const name = this.user()?.fullName ?? '';
    return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  });

  bottomNavItems = [
    { label: 'Home', icon: 'fluentHome', route: '/home' },
    { label: 'Jobs', icon: 'fluentBriefcase', route: '/jobs' },
    { label: 'Apps', icon: 'fluentDocumentText', route: '/applications' },
    { label: 'Notif', icon: 'fluentAlert', route: '/notifications' },
    { label: 'Profile', icon: 'fluentPerson', route: '/profile' },
  ];
}
