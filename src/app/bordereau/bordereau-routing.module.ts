import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SousBordereauComponent} from './sous-bordereau/sous-bordereau.component';
import {DetSousbordereauComponent} from './det-sousbordereau/det-sousbordereau.component';
import {ListSousbordereauComponent} from './list-sousbordereau/list-sousbordereau.component';
import {DetBordGlobalComponent} from './det-bord-global/det-bord-global.component';
import {EditBordGlobalComponent} from './edit-bord-global/edit-bord-global.component';

const routes: Routes = [
  { path: '', component: SousBordereauComponent},
  { path: 'list', component:ListSousbordereauComponent},
  { path: 'det-bordereau', component: DetSousbordereauComponent},
  { path: 'detail-bord-global/:id', component: DetBordGlobalComponent},
  { path: 'edit-bord-global/:id', component: EditBordGlobalComponent}




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BordereauRoutingModule { }
