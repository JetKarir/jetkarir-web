import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentQuestionCircle,
  fluentPersonSupport,
  fluentBookOpen,
  fluentChevronDown,
  fluentMail,
  fluentChat,
  fluentPlayCircle,
  fluentArrowRight,
} from '@ng-icons/fluent-ui';

@Component({
  selector: 'app-help',
  imports: [NgIcon],
  providers: [
    provideIcons({
      fluentQuestionCircle,
      fluentPersonSupport,
      fluentBookOpen,
      fluentChevronDown,
      fluentMail,
      fluentChat,
      fluentPlayCircle,
      fluentArrowRight,
    }),
  ],
  templateUrl: './help.html',
  styleUrl: './help.scss',
})
export class HelpPage {
  location = inject(Location);
}
