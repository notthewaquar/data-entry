import { Component, OnInit } from '@angular/core';

import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  isAuthenticated = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
  }
  logout() {
  }
  onLogout() {
    this.authService.logout();
  }
}
