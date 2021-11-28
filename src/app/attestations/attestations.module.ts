import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttestationsRoutingModule } from './attestations-routing.module';
import { TraitAttestationsComponent } from './trait-attestations/trait-attestations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TraitAttestationsComponent],
  imports: [
    CommonModule,
    AttestationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule

  ]
})
export class AttestationsModule { }
