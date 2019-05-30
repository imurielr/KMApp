import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AlertsComponent } from './alerts/alerts.component';

// import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from '../oauth';
import { FormComponent } from './form/form.component';
import { Top10Component } from './top10/top10.component';
import { VerifyComponent } from './verify/verify.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RecompensasComponent } from './recompensas/recompensas.component';

library.add(faExternalLinkAlt);
library.add(faUserCircle);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,   
    AlertsComponent,
    FormComponent,
    Top10Component,
    VerifyComponent,
    RecompensasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // AmplifyAngularModule,
    FontAwesomeModule,
    MsalModule.forRoot({
      clientID: OAuthSettings.appId
    }),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  // providers: [AmplifyService],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
