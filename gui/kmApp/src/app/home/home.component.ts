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

  cargo = this.authService.getUser().then(user => this.getCharge(user.email));
  show : Promise<boolean>;

  element : HTMLElement;

  constructor(private authService: AuthService, private http: HttpClient) {}

  async signIn(): Promise<void> {
    await this.authService.signIn(); 
    await this.authService.getUser().then(user => this.getCharge(user.email));
  }

  async getCharge(usuario: string){
    await this.http.get(`${API_URL}/tipo/${usuario}`).subscribe(data => {
      this.setCharge(data);
    })
  }

  setCharge(charge){
    if(charge === 'Experto' || charge === 'Director'){
      this.show = Promise.resolve(true);
    }
    else{
      this.show = Promise.resolve(false);
    }
  }
}