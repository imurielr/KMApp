import { Component, OnInit } from '@angular/core';
//import { FindService } from '../library.service'

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';
import { API_URL } from '../env';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {

  searchTerm = '';
  libraryName = '';

  public docs;
  public documentInfo: Array<string>;

  //constructor(private findService : FindService) { }
  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments(){
    this.http.get(`${API_URL}/verified`).subscribe(data => {
      this.docs = data;
    })
  }

  updateTerm(event: any): void {
    this.searchTerm = event.target.value;
  }
 
  updateName(event: any): void {
    this.libraryName = event.target.value;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    });
  }

}