import { Component } from '@angular/core';

@Component({
  selector: 'app-lp-features',
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class LpFeaturesComponent {
  features = [
    {
      icon: 'pi pi-bolt',
      title: 'AI Matching Cerdas',
      desc: 'Algoritma AI kami mencocokkan profil Anda dengan lowongan yang paling relevan secara real-time.',
    },
    {
      icon: 'pi pi-send',
      title: 'Auto Apply',
      desc: 'Lamar puluhan pekerjaan sekaligus dengan satu klik. Hemat waktu, perbesar peluang.',
    },
    {
      icon: 'pi pi-chart-line',
      title: 'Pantau Progres',
      desc: 'Lacak status semua lamaran dalam satu dashboard. Tidak ada yang terlewat.',
    },
    {
      icon: 'pi pi-shield',
      title: 'Data Aman',
      desc: 'Profil dan data pribadi Anda dienkripsi dan hanya dibagikan atas izin Anda.',
    },
  ];
}
