import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilRoutingModule } from './accueil-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { Accueil2Component } from './accueil2/accueil2.component';

@NgModule({
  declarations: [AccueilComponent, Accueil2Component],
  imports: [
    CommonModule,
    AccueilRoutingModule
  ]
})
export class AccueilModule { }
