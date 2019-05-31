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

  nombre: string;
  tema: string;
  responsable: string;
  especialidad: string;
  area: string;
  datos: string;
  realizado: string;
  diferencia: string;
  porque: string;
  resultados: string;
  repetible: boolean;
  repeticion: string;
  
  submitted = false;

  async onSubmit(){
    this.nombre = ((document.getElementById('nombre') as HTMLInputElement).value);
    this.tema = ((document.getElementById('tema') as HTMLInputElement).value);

    // await this.authService.getUser().then(res => { this.responsable = res['displayName'] }); //this.setName(res['displayName']) });

    this.responsable = this.authService.user.displayName
    this.especialidad = ((document.getElementById('especialidad') as HTMLInputElement).value);
    this.area = ((document.getElementById('area') as HTMLInputElement).value);
    this.datos = ((document.getElementById('datos') as HTMLInputElement).value);
    this.realizado = ((document.getElementById('realizado') as HTMLInputElement).value);
    this.diferencia = ((document.getElementById('diferencia') as HTMLInputElement).value);
    this.porque = ((document.getElementById('porque') as HTMLInputElement).value);
    this.resultados = ((document.getElementById('resultados') as HTMLInputElement).value);

    if((document.getElementById('esRepetible') as HTMLInputElement).checked){
      this.repetible = true;
      this.repeticion = ((document.getElementById('repeticion') as HTMLInputElement).value);
    }
    else if((document.getElementById('esRepetible2') as HTMLInputElement).checked){
      this.repetible = false;
      this.repeticion = '';
    }
    
    this.postEntry(this.nombre, this.tema, this.responsable, this.especialidad, this.area, this.datos, this.realizado, this.diferencia, this.porque, this.resultados, this.repetible, this.repeticion);
  }

  postEntry(nombre: string, tema: string, responsable: string, especialidad: string, area: string, datos: string, realizado: string, diferencia: string, porque: string, resultados: string, repetible: boolean, repeticion: string){
    if(nombre === '' || tema === '' || responsable === '' || area === '' || datos === '' || realizado === '' || diferencia === '' || porque === '' || resultados === ''){
      console.log("ERROR")
      this.tituloMensaje = "ERROR";
      this.mensaje = "Ingrese todos los datos obligatorios.";
    }
    else{
      const req = this.http.post(`${API_URL}/docs`, {
        nombre: nombre,
        tema: tema,
        responsable: responsable,
        especialidad: especialidad,
        area: area,
        datos: datos,
        realizado: realizado,
        diferencia: diferencia,
        porque: porque,
        resultados: resultados,
        repetible: repetible,
        repeticion: repeticion,
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
