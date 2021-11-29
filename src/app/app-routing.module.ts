import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FullComponent} from './layoutes/full/full.component';
import {Full_ROUTES} from './shared/routes/full-layoute.routes';
import {ContentComponent} from './layoutes/content/content.component';
import {CONTENT_ROUTES} from './shared/routes/content-layoute.routes';

const routes: Routes = [
  { path: '', redirectTo: 'pages/login', pathMatch: 'full' },
  { path: '', component: FullComponent, data: { title: 'full Views' }, children: Full_ROUTES},
  { path: '', component: ContentComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
