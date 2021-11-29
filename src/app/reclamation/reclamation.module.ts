import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclamationRoutingModule } from './reclamation-routing.module';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReclamationComponent, ListReclamationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReclamationRoutingModule
  ]
})
export class ReclamationModule { }
