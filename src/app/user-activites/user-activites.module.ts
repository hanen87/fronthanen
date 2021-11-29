import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserActivitesRoutingModule } from './user-activites-routing.module';
import { ActivitesComponent } from './activites/activites.component';

@NgModule({
  declarations: [ActivitesComponent],
  imports: [
    CommonModule,
    UserActivitesRoutingModule
  ]
})
export class UserActivitesModule { }
