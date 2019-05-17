import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { API_URL } from '../env';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(private http: HttpClient, private authService: AuthService) { }

  especialidades  = ['Asesor', 'Medio', 'Experto', 'Director'];

  // titulo = (<HTMLInputElement>document.getElementById('titulo'))
  titulo: string;
  responsable: string;
  especialidad: string;
  area: string;
  
  submitted = false;

  onSubmit(){
    this.titulo = ((document.getElementById('titulo') as HTMLInputElement).value);
    this.responsable = ((document.getElementById('responsable') as HTMLInputElement).value);
    this.especialidad = ((document.getElementById('especialidad') as HTMLInputElement).value);
    this.area = ((document.getElementById('area') as HTMLInputElement).value);
    this.postEntry(this.titulo, this.responsable, this.especialidad, this.area);
  }

  postEntry(titulo: string, responsable: string, especialidad: string, area: string){
    if(titulo === '' || responsable === '' || area === ''){
      console.log("ERROR")
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
          }
        }
      );
    }
  } 

  updatePoints(usuario: string){
    const req = this.http.put(`${API_URL}/${usuario}/5`, {})
    .subscribe(
      res => {
        console.log(res);
        window.open('/home', '_self', '', false);
      }
    );
  }

}
