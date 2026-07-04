import { Component } from '@angular/core';

@Component({
  selector: 'app-lp-steps',
  templateUrl: './steps.html',
  styleUrl: './steps.scss',
})
export class LpStepsComponent {
  steps = [
    { num: '01', title: 'Buat Profil', desc: 'Lengkapi profil dalam 5 menit dan biarkan AI mengoptimalkan tampilan Anda.' },
    { num: '02', title: 'Temukan Kerja', desc: 'Jelajahi ribuan lowongan atau biarkan rekomendasi AI bekerja untuk Anda.' },
    { num: '03', title: 'Lamar & Pantau', desc: 'Lamar dengan mudah dan pantau progres lamaran secara real-time.' },
  ];
}
