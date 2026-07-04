import { Component } from '@angular/core';

@Component({
  selector: 'app-lp-companies',
  templateUrl: './companies.html',
  styleUrl: './companies.scss',
})
export class LpCompaniesComponent {
  companies = ['Tokopedia', 'Gojek', 'Traveloka', 'Bukalapak', 'Shopee', 'OVO'];
}
