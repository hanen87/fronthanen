import {Routes} from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('../../user-page/user-page.module').then(m => m.UserPageModule)
  }
];
