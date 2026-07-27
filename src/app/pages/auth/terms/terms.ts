import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terms',
  imports: [],
  templateUrl: './terms.html',
  styleUrl: './terms.scss',
})
export class TermsPage {
  location = inject(Location);
}
