import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemandeComponent} from './demande/demande.component';
import {AddDemandeComponent} from './add-demande/add-demande.component';
import {DetDemandeComponent} from './det-demande/det-demande.component';

const routes: Routes = [
  { path: '', component: DemandeComponent },
  { path: 'add-demande', component: AddDemandeComponent },
  { path: 'det-demande/:id', component: DetDemandeComponent }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeRoutingModule { }
