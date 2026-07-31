import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentHome,
  fluentCompassNorthwest,
  fluentAddCircle,
  fluentChat,
  fluentPerson,
} from '@ng-icons/fluent-ui';

@Component({
  selector: 'app-main-botbar',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  providers: [provideIcons({ fluentHome, fluentCompassNorthwest, fluentAddCircle, fluentChat, fluentPerson })],
  templateUrl: './main-botbar.html',
  styleUrl: './main-botbar.scss',
})
export class MainBotbar {
  navItems = [
    { label: 'Home', icon: 'fluentHome', route: '/home' },
    { label: 'Explore', icon: 'fluentCompassNorthwest', route: '/explore' },
    { label: 'Post', icon: 'fluentAddCircle', route: '/post' },
    { label: 'Chat', icon: 'fluentChat', route: '/chat' },
    { label: 'Profile', icon: 'fluentPerson', route: '/profile' },
  ];
}
