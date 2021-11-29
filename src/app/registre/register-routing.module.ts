import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistreComponent } from '../registre/registre.component';

const routes: Routes = [
  {path: '' , component: RegistreComponent},
//   {path: 'list-reclamation' , component: ListReclamationComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
