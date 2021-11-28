import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ParamServicesComponent } from './param-services/param-services.component';
import { ParamApplicationsComponent } from './param-applications/param-applications.component';
import { ParamEtablissementsComponent } from './param-etablissements/param-etablissements.component';
import { ParamTypesComponent } from './param-types/param-types.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ParamServicesComponent, ParamApplicationsComponent, ParamEtablissementsComponent, ParamTypesComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ServicesModule { }
