import { Component } from '@angular/core';

@Component({
  selector: 'app-lp-stats',
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class LpStatsComponent {
  stats = [
    { value: '50K+', label: 'Lowongan Aktif' },
    { value: '200K+', label: 'Kandidat Terdaftar' },
    { value: '8K+', label: 'Perusahaan Mitra' },
    { value: '92%', label: 'Tingkat Kepuasan' },
  ];
}
