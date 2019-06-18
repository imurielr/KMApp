import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

import { HttpClient } from '@angular/common/http';

import { API_URL } from '../env';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public authService: AuthService, private http: HttpClient) {}

  async signIn(): Promise<void> {
    await this.authService.signIn(); 
  }
}