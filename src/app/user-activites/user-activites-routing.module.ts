import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActivitesComponent} from './activites/activites.component';

const routes: Routes = [
  {path: '' , component: ActivitesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActivitesRoutingModule { }
