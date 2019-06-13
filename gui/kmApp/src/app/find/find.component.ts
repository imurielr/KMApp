import { Component, OnInit,TemplateRef } from '@angular/core';
//import { FindService } from '../library.service'

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';
import { API_URL } from '../env';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {

  
  searchTerm = '';
  libraryName = '';

  public docs: Object;
  public results;
  public documentInfo: Array<string>;
  public tituloMensaje: string;
  public mensaje: string;
  public show = false;
  public showResults =false;
  public showDetail=false;
 

  soluciones = ['Todas','KMAPP','Sucursal Virtual','Nequi','Wikity','Billetera'];
  areas =['Todas','TI','Desarrollo','Soporte','Investigacion','Prevención de riesgos'];
  procesos = ['Todos','Desarrollo','Solución de problemas','Despliegue','Front','Back','Bugs'];

  //constructor(private findService : FindService) { }
  constructor(private http: HttpClient,private authService: AuthService, private modalService: BsModalService, private modalService2: NgbModal) { }

  modalRef: BsModalRef;
  nombre : string;
  datos: string;
  realizado: string;
  diferencia: string;
  porque: string;
  resultados: string;

  sarea:string;
  ssolution:string;
  sproceso:string;
  snombre:string;

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments(){
    this.http.get(`${API_URL}/verified`).subscribe(data => {
      this.docs = data;
    })
  }

  open(content) {
    this.modalService2.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    });
  }

  

  async onSubmit(name){
    
    this.nombre= name;
    this.datos = ((document.getElementById('datos') as HTMLInputElement).value);
    this.realizado = ((document.getElementById('realizado') as HTMLInputElement).value);
    this.diferencia = ((document.getElementById('diferencia') as HTMLInputElement).value);
    this.porque = ((document.getElementById('porque') as HTMLInputElement).value);
    this.resultados = ((document.getElementById('resultados') as HTMLInputElement).value);

    this.postEntry(this.nombre,this.datos, this.realizado, this.diferencia, this.porque, this.resultados);
  }

  async postEntry(nombre:string,datos: string, realizado: string, diferencia: string, porque: string, resultados: string){
    if(datos === '' || realizado === '' || diferencia === '' || porque === '' || resultados === ''){
      console.log("ERROR")
      this.tituloMensaje = "ERROR";
      this.mensaje = "Ingrese todos los datos obligatorios.";
    }
    else{
      await this.http.put(`${API_URL}/edit/${nombre}/${datos}/${realizado}/${diferencia}/${porque}/${resultados}`, {})
      .subscribe(
        res => {
          if(res == "Objeto editado exitosamente"){
            this.authService.getUser().then(res => { this.updatePoints(res['email']); });
          }
          else{
            console.log("error");
            this.tituloMensaje = "ERROR";
            this.mensaje = "Ocurrió un error al editar el objeto de conocimiento";
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
        this.mensaje = "Has ganado 5 puntos por editar un objeto de conocimiento. Sigue así!"
      }
    );
  }

 async fillResults(){
    this.snombre = ((document.getElementById('nombre') as HTMLInputElement).value);
    this.ssolution = ((document.getElementById('solucion') as HTMLInputElement).value);
    this.sarea = ((document.getElementById('area') as HTMLInputElement).value);
    this.sproceso = ((document.getElementById('proceso') as HTMLInputElement).value);
    let nombre1 =this.snombre;
    if(nombre1==''){
      nombre1='null';
    }
    let area1 =this.sarea;
    let solucion1=this.ssolution;
    let proceso1 =this.sproceso;
    this.results=[];
    await this.http.get(`${API_URL}/search/${nombre1}/${area1}/${solucion1}/${proceso1}`).subscribe(data => {
      this.results = data;
    })
 }
} 