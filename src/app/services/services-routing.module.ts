import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ParamServicesComponent} from './param-services/param-services.component';
import {ParamApplicationsComponent} from './param-applications/param-applications.component';
import {ParamEtablissementsComponent} from './param-etablissements/param-etablissements.component';
import {ParamTypesComponent} from './param-types/param-types.component';

const routes: Routes = [
  {path: 'param', component: ParamServicesComponent},
  {path: 'param-app' , component: ParamApplicationsComponent},
  {path: 'param-etablissement' , component: ParamEtablissementsComponent},
  {path: 'param-types' , component: ParamTypesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
