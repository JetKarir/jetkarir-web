import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentAlert, fluentBriefcase } from '@ng-icons/fluent-ui';

@Component({
  selector: 'app-main-topbar',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  providers: [provideIcons({ fluentAlert, fluentBriefcase })],
  templateUrl: './main-topbar.html',
  styleUrl: './main-topbar.scss',
})
export class MainTopbar {}
