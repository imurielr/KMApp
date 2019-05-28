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

  public docs;
  public documentInfo: Array<string>;
  public show = false;
  
  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments(){
    this.http.get(`${API_URL}/get_docs`).subscribe(data => {
      this.docs = data;
    })
  }

  async verify(doc: string, responsable: string){
    var date = (document.getElementById('validez') as HTMLInputElement).value;
    var str = date.split('/')
    var validez = new Date(Number(str[2]), Number(str[1]) - 1, Number(str[0]));
    
    str = validez.toString().split(' ');
    date = str[1] + ' ' + str[2] + ' ' + str[3];

    await this.http.put(`${API_URL}/update_status/${responsable}/${doc}/${date}`, {}).subscribe(
      res => {
        console.log(res)
        window.open('/verify', '_self', '', false);
      }
    );
  }
}
