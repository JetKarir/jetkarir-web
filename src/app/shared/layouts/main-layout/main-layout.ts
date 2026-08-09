import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MainNavbar } from '../../navbars/main-navbar/main-navbar';
import { MainTopbar } from '../../navbars/main-topbar/main-topbar';
import { MainBotbar } from '../../navbars/main-botbar/main-botbar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, ToastModule, MainNavbar, MainTopbar, MainBotbar],
  providers: [MessageService],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  authService = inject(AuthService);
  user = this.authService.currentUser;

  ngOnInit() {
    if (!this.user()) {
      this.authService.getMe().subscribe({ error: () => {} });
    }
  }
}
