import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentAlert, fluentBriefcase } from '@ng-icons/fluent-ui';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-main-topbar',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  providers: [provideIcons({ fluentAlert, fluentBriefcase })],
  templateUrl: './main-topbar.html',
  styleUrl: './main-topbar.scss',
})
export class MainTopbar {
  private router = inject(Router);

  isChat = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects.startsWith('/chat')),
      startWith(this.router.url.startsWith('/chat')),
    ),
    { initialValue: this.router.url.startsWith('/chat') },
  );
}
