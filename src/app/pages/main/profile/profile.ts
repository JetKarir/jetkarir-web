import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../core/service/auth/auth-service';
import { CandidateService } from '../../../core/service/main/candidate/candidate.service';
import { CandidateProfile } from '../../../core/model/interface/application.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, SkeletonModule, TagModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfilePage implements OnInit {
  authService = inject(AuthService);
  candidateService = inject(CandidateService);

  user = this.authService.currentUser;
  profile = signal<CandidateProfile | null>(null);
  completion = signal<number>(0);
  loading = signal(true);

  initials = computed(() => {
    const name = this.user()?.fullName ?? '';
    return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  });

  ngOnInit() {
    this.candidateService.getCandidateProfile().subscribe({
      next: (res) => {
        this.profile.set(res.data);
        this.completion.set(res.data?.profileCompletion ?? 0);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
