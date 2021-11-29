import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDemandesRoutingModule } from './user-demandes-routing.module';
import { DemandesComponent } from './demandes/demandes.component';
import { NewDemandeComponent } from './new-demande/new-demande.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewDemandeActifComponent } from './new-demande-actif/new-demande-actif.component';
import { RevocationComponent } from './revocation/revocation.component';
import { DemandeActifsComponent } from './demande-actifs/demande-actifs.component';
import { DetaildemandeitComponent } from './detaildemandeit/detaildemandeit.component';
import { DetaildemandeactifComponent } from './detaildemandeactif/detaildemandeactif.component';

@NgModule({
  declarations: [DemandesComponent, NewDemandeComponent, NewDemandeActifComponent, RevocationComponent, DemandeActifsComponent, DetaildemandeitComponent, DetaildemandeactifComponent],
    imports: [
        CommonModule,
        UserDemandesRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class UserDemandesModule { }
