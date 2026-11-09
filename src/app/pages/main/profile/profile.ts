import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentMoreVertical,
  fluentArrowDownload,
  fluentEdit,
  fluentLocation,
  fluentGlobe,
  fluentBuilding,
  fluentBook,
  fluentPerson,
} from '@ng-icons/fluent-ui';
import { MainWidget } from '../../../shared/reusables/main-widget/main-widget';

@Component({
  selector: 'app-profile',
  imports: [NgIcon, MainWidget],
  providers: [
    provideIcons({
      fluentMoreVertical,
      fluentArrowDownload,
      fluentEdit,
      fluentLocation,
      fluentGlobe,
      fluentBuilding,
      fluentBook,
      fluentPerson,
    }),
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfilePage {
  private route = inject(ActivatedRoute);

  // segment is "@rafiananda" — strip leading @ for API calls if needed
  username = toSignal(this.route.paramMap.pipe(map((p) => p.get('username') ?? '')));
  activeTab = signal<'about' | 'posting' | 'hiring'>('about');
}
