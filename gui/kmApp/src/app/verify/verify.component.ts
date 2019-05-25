import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

import { HttpClient } from '@angular/common/http';
import { API_URL } from '../env';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  public docs = this.getDocuments()

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
  }

  getDocuments(){
    this.http.get(`${API_URL}/get_docs`).subscribe(data => {
      this.setDocuments(data);
    })
  }

  setDocuments(docs){
    this.docs = docs;
  }

}
