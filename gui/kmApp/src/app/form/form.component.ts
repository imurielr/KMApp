import { Component, TemplateRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { API_URL } from '../env';

import { AuthService } from '../auth.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(private http: HttpClient, private authService: AuthService, private modalService: BsModalService) { }

  modalRef: BsModalRef;

  public tituloMensaje: string;
  public mensaje: string;
  public show = false;

  especialidades  = ['Asesor', 'Medio', 'Experto', 'Director'];

  titulo: string;
  responsable: string;
  especialidad: string;
  area: string;
  
  submitted = false;

  async onSubmit(){
    this.titulo = ((document.getElementById('titulo') as HTMLInputElement).value);
    // this.responsable = ((document.getElementById('responsable') as HTMLInputElement).value);
    await this.authService.getUser().then(res => { this.responsable = res['displayName'] }); //this.setName(res['displayName']) });
    this.especialidad = ((document.getElementById('especialidad') as HTMLInputElement).value);
    this.area = ((document.getElementById('area') as HTMLInputElement).value);
    this.postEntry(this.titulo, this.responsable, this.especialidad, this.area);
  }

  postEntry(titulo: string, responsable: string, especialidad: string, area: string){
    if(titulo === '' || responsable === '' || area === ''){
      console.log("ERROR")
      this.tituloMensaje = "ERROR";
      this.mensaje = "Ingrese todos los datos obligatorios.";
    }
    else{
      const req = this.http.post(`${API_URL}/docs`, {
        titulo: titulo,
        responsable: responsable,
        especialidad: especialidad,
        area: area
      })
      .subscribe(
        res => {
          if(res == "Objeto añadido exitosamente"){
            this.authService.getUser().then(res => { this.updatePoints(res['email']); });
          }
          else{
            console.log("error");
            this.tituloMensaje = "ERROR";
            this.mensaje = "Ocurrió un error al ingresar el objeto de conocimiento, es probable que ya exista un documento con este título a su nombre.";
          }
        }
      );
    }
  } 

  updatePoints(usuario: string){
    const req = this.http.put(`${API_URL}/update_points/${usuario}/5`, {})
    .subscribe(
      res => {
        console.log(res)
        this.tituloMensaje = "Felicidades"
        this.mensaje = "Has ganado 5 puntos por ingresar un nuevo objeto de conocimiento. Sigue así!"
      }
    );
  }
  
  setName(nombre: string){
    this.responsable = nombre;
  }

  async openModal(template: TemplateRef<any>) {
    await this.onSubmit();
    this.modalRef = this.modalService.show(template);
  }

  closeModal(){
    if(this.tituloMensaje === "ERROR"){
      this.modalRef.hide();
    }
    else{
      this.modalRef.hide();
      window.open('/home', '_self', '', false);
    }
  }
}
