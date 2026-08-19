import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MainNavbar } from '../../navbars/main-navbar/main-navbar';
import { MainTopbar } from '../../navbars/main-topbar/main-topbar';
import { MainBotbar } from '../../navbars/main-botbar/main-botbar';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, ToastModule, MainNavbar, MainTopbar, MainBotbar],
  providers: [MessageService],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  authService = inject(AuthService);
  private router = inject(Router);
  user = this.authService.currentUser;

  isChat = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects.startsWith('/chat')),
      startWith(this.router.url.startsWith('/chat')),
    ),
    { initialValue: this.router.url.startsWith('/chat') },
  );

  ngOnInit() {
    if (!this.user()) {
      this.authService.getMe().subscribe({ error: () => {} });
    }
  }
}
