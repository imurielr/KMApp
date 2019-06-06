import { Component, OnInit } from '@angular/core';
//import { FindService } from '../library.service'

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {

  searchTerm = '';
  libraryName = '';

  //constructor(private findService : FindService) { }
  constructor() { }
  updateTerm(event: any): void {
    this.searchTerm = event.target.value;
  }
 
  updateName(event: any): void {
    this.libraryName = event.target.value;
  }

  ngOnInit() {
  }

}
