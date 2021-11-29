import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TraitAttestationsComponent} from './trait-attestations/trait-attestations.component';

const routes: Routes = [
  { path: '', component: TraitAttestationsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttestationsRoutingModule { }
