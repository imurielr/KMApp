import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../auth.service';

import { HttpClient } from '@angular/common/http';
import { API_URL } from '../env';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  public docs;
  public documentInfo: Array<string>;
  public show = false;

  public tituloMensaje: string;
  public mensaje: string;

  modalRef: BsModalRef;
  
  constructor(private authService: AuthService, private http: HttpClient, private modalService: BsModalService) { }

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
    if(date == ""){
      this.tituloMensaje = "ERROR";
      this.mensaje = "Ingrese la fecha límite de validez del objeto de conocimiento";
    }
    else{
      var str = date.split('/')
      var validez = new Date(Number(str[2]), Number(str[1]) - 1, Number(str[0]));
      
      str = validez.toString().split(' ');
      date = str[1] + ' ' + str[2] + ' ' + str[3];

      await this.http.put(`${API_URL}/update_status/${responsable}/${doc}/${date}`, {}).subscribe(
        res => {
          console.log(res)
          this.tituloMensaje = "Verificación exitosa"
         this.mensaje = "El objeto de conocimiento ha sido verificado exitosamente!"
          
        }
      );
    }
  }

  async openModal(template: TemplateRef<any>, doc: string, responsable: string) {
    await this.verify(doc, responsable);
    this.modalRef = this.modalService.show(template);
  }

  closeModal(){
    if(this.tituloMensaje === "ERROR"){
      this.modalRef.hide();
    }
    else{
      this.modalRef.hide();
      window.open('/verify', '_self', '', false);
    }
  }
}
