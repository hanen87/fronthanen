import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandeRoutingModule } from './demande-routing.module';
import { DemandeComponent } from './demande/demande.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddDemandeComponent } from './add-demande/add-demande.component';
import { DetDemandeComponent } from './det-demande/det-demande.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DemandeComponent, AddDemandeComponent, 
    DetDemandeComponent],
  imports: [
    CommonModule,
    DemandeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule
  ]
})
export class DemandeModule { }
