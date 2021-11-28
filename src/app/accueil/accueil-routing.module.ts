import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import { Accueil2Component } from './accueil2/accueil2.component';

const routes: Routes = [
  {path: '' , component: AccueilComponent},
  {path: 'nouvelle-demande' , component: Accueil2Component}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule { }
