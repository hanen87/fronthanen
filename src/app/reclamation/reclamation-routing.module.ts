import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReclamationComponent} from './reclamation/reclamation.component';
import {ListReclamationComponent} from './list-reclamation/list-reclamation.component';
import { RegistreComponent } from '../registre/registre.component';

const routes: Routes = [
  {path: '' , component: ReclamationComponent},
  {path: 'list-reclamation' , component: ListReclamationComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationRoutingModule { }
