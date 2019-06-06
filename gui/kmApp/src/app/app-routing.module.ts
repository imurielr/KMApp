import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { Top10Component } from './top10/top10.component';
import { VerifyComponent } from './verify/verify.component';
import { RecompensasComponent } from './recompensas/recompensas.component';
import { FindComponent } from './find/find.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'top10',
    component: Top10Component
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'recompensas',
    component: RecompensasComponent
  },
  {
    path: 'find',
    component: FindComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
