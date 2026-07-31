import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentNavigation, fluentDismiss } from '@ng-icons/fluent-ui';

@Component({
  selector: 'app-landing-navbar',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  providers: [provideIcons({ fluentNavigation, fluentDismiss })],
  templateUrl: './landing-navbar.html',
  styleUrl: './landing-navbar.scss',
})
export class LandingNavbarComponent {
  sidebarOpen = signal(false);
  openSidebar() { this.sidebarOpen.set(true); }
  closeSidebar() { this.sidebarOpen.set(false); }
}
