import { Component, inject, computed, ViewChild, ElementRef } from '@angular/core';
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
  fluentBuildingRetailMore,
  fluentStar,
  fluentArrowExit,
  fluentPersonSwap,
} from '@ng-icons/fluent-ui';
import { AuthService } from '../../../core/services/auth/auth-service';
import { AvatarModule } from 'primeng/avatar';
import { Popover, PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-main-navbar',
  imports: [RouterLink, RouterLinkActive, NgIcon, AvatarModule, PopoverModule],
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
      fluentBuildingRetailMore,
      fluentStar,
      fluentArrowExit,
      fluentPersonSwap,
    }),
  ],
  templateUrl: './main-navbar.html',
  styleUrl: './main-navbar.scss',
})
export class MainNavbar {
  authService = inject(AuthService);

  @ViewChild('op') op!: Popover;
  @ViewChild('moreBtn') moreBtn!: ElementRef<HTMLButtonElement>;

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
    { label: 'Home', icon: 'fluentHome', route: '/' },
    { label: 'Explore', icon: 'fluentCompassNorthwest', route: '/explore' },
    { label: 'Jobs', icon: 'fluentBriefcase', route: '/jobs' },
    { label: 'Notif', icon: 'fluentAlert', route: '/notifications' },
    { label: 'Saved', icon: 'fluentBookmark', route: '/saved' },
    { label: 'Chat', icon: 'fluentChat', route: '/chat' },
    { label: 'Teams', icon: 'fluentBuildingRetailMore', route: '/teams' },
    { label: 'Premium', icon: 'fluentStar', route: '/premium' },
    { label: 'Setting', icon: 'fluentSettings', route: '/settings' },
  ];

  onPopoverShow() {
    requestAnimationFrame(() => {
      const container = (this.op as any).container as HTMLElement | undefined;
      if (!container || !this.moreBtn?.nativeElement) return;
      const btnRect = this.moreBtn.nativeElement.getBoundingClientRect();
      const popoverWidth = container.offsetWidth;
      // arrow right: 1.2rem from popover right → center at (popoverWidth - 19.2px)
      const arrowRightPx = 1.2 * 16;
      const newLeft = btnRect.left + btnRect.width / 2 - popoverWidth + arrowRightPx;
      // PrimeNG uses insetInlineStart, not left — must override same property
      container.style.insetInlineStart = `${Math.max(0, newLeft)}px`;
    });
  }

  logout() {
    this.authService.logout();
  }
}
