import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.css']
})
export class Top10Component implements OnInit {

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
  }

}
