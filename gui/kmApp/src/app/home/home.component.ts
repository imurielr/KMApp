import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

import { HttpClient } from '@angular/common/http';

import { API_URL } from '../env';
import { type } from 'os';
// import { Response } from 'selenium-webdriver/http';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() { 
    // GET POINTS
    // this.http.get<Response>(`${API_URL}/${this.authService.getUser()}`).subscribe(data => {
    //   console.log(data);
    // });

    this.authService.getUser().then(res => { this.addUser(res['email']);});
  }

  addUser(usuario: string){
    // ADD NEW USER
    if(this.authService.authenticated){
      const req = this.http.post(`${API_URL}/`, {
        usuario: usuario
      })
      .subscribe(
        res => {
          console.log(res);
        }
      );
    }
  }

  async signIn(): Promise<void> {
    await this.authService.signIn(); 
  }
}

interface Response{
  displayName: string;
  email: string;
}