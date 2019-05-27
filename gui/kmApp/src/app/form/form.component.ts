import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { API_URL } from '../env';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(private http: HttpClient, private authService: AuthService, public snackbar: MatSnackBar) { }

  especialidades  = ['Asesor', 'Medio', 'Experto', 'Director'];

  titulo: string;
  responsable: string;
  especialidad: string;
  area: string;
  
  submitted = false;

  async onSubmit(){
    this.titulo = ((document.getElementById('titulo') as HTMLInputElement).value);
    // this.responsable = ((document.getElementById('responsable') as HTMLInputElement).value);
    await this.authService.getUser().then(res => { this.setName(res['displayName']) });
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
    const req = this.http.put(`${API_URL}/update_points/${usuario}/5`, {})
    .subscribe(
      res => {
        console.log(res)
        alert("Felicidades, has ganado 5 puntos!");
        window.open('/home', '_self', '', false);
        // this.openSnackBar();
      }
    );
  }
  
  setName(nombre: string){
    this.responsable = nombre;
  }

  openSnackBar(){
    console.log("HI");
    const snackbarRef = this.snackbar.open('HEllooo', '', {
      horizontalPosition: 'end'
    });
     
  }

}
