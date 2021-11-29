import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BordereauRoutingModule } from './bordereau-routing.module';
import { SousBordereauComponent } from './sous-bordereau/sous-bordereau.component';
import { ListSousbordereauComponent } from './list-sousbordereau/list-sousbordereau.component';
import { DetSousbordereauComponent } from './det-sousbordereau/det-sousbordereau.component';
import { DetBordGlobalComponent } from './det-bord-global/det-bord-global.component';
import { EditBordGlobalComponent } from './edit-bord-global/edit-bord-global.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SousBordereauComponent, 
    ListSousbordereauComponent,
     DetSousbordereauComponent,
      DetBordGlobalComponent, 
      EditBordGlobalComponent],
  imports: [
    CommonModule,
    BordereauRoutingModule,
    FormsModule,
    NgbModalModule,
    ReactiveFormsModule
  ]
})
export class BordereauModule { }
