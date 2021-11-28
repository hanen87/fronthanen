import { NewDemandeActifComponent } from './new-demande-actif/new-demande-actif.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemandesComponent} from '../user-demandes/demandes/demandes.component';
import {NewDemandeComponent} from './new-demande/new-demande.component';
import { RevocationComponent } from './revocation/revocation.component';
import { DemandeActifsComponent } from './demande-actifs/demande-actifs.component';
import { DetaildemandeitComponent } from './detaildemandeit/detaildemandeit.component';
import { DetaildemandeactifComponent } from './detaildemandeactif/detaildemandeactif.component';

const routes: Routes = [
  {path: '' , component : DemandesComponent}, 
  {path: 'actif' , component : DemandeActifsComponent},
  {path: 'det-demande-it/:id' , component : DetaildemandeitComponent},
  {path: 'det-demande-actif/:id' , component : DetaildemandeactifComponent},
  {path: 'new-demande' , component : NewDemandeComponent},
  {path: 'new-demande-actif' , component : NewDemandeActifComponent},
  {path: 'reevocation-demande-it' , component : RevocationComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDemandesRoutingModule { }
