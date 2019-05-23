import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

import { HttpClient } from '@angular/common/http';

import { API_URL } from '../env';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // Should the collapsed nav show?
  showNav: boolean;
  showNotif: boolean;

  public documents = this.authService.getUser().then(res => this.getOutdated(res['displayName']))
  
  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.showNav = false;
  }

  // Used by the Bootstrap navbar-toggler button to hide/show
  // the nav in a collapsed state
  toggleNavBar(): void {
    this.showNav = !this.showNav;
  }

  async signIn(): Promise<void> {
    await this.authService.signIn();
    await this.authService.getUser().then(res => this.getOutdated(res['displayName']))
  }

  signOut(): void {
    this.authService.signOut();
  }

  getOutdated(usuario: string): void{
    this.http.get(`${API_URL}/outdated/${usuario}`).subscribe(data => {
      this.setDocuments(data);
    })
  }

  setDocuments(docs){
    if(docs === "No hay documentos desactualizados"){
      this.showNotif = false;
    }
    else{
      this.documents = docs;
      this.showNotif = true;
    }
  }

}