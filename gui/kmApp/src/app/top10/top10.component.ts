import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

import { HttpClient } from '@angular/common/http';
import { API_URL } from '../env';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.css']
})
export class Top10Component implements OnInit {

  public top = this.getTop();

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
  }

  getTop(){
    this.http.get(`${API_URL}/get_top`).subscribe(data => {
      this.setTop(data);
    })
  }

  setTop(top){
    this.top = top;
  }

}
