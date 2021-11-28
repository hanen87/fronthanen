import { AuthGuard } from './../../guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';

export const Full_ROUTES: Routes = [

  {
    path: 'page',canActivate:[AuthGuard],
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'demande',
    loadChildren: () => import('../../demande/demande.module').then(m => m.DemandeModule)
  },
  {
    path: 'attestations',
    loadChildren: () => import('../../attestations/attestations.module').then(m => m.AttestationsModule)
  },
  {
    path: 'reclamation',
    loadChildren: () => import('../../reclamation/reclamation.module').then(m => m.ReclamationModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../../registre/registre.module').then(m => m.RegisterModule)
  },
  {
    path: 'services',
    loadChildren: () => import('../../services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'bordereau',
    loadChildren: () => import('../../bordereau/bordereau.module').then(m => m.BordereauModule)
  },
  {
    path: 'bordereau',
    loadChildren: () => import('../../bordereau/bordereau.module').then(m => m.BordereauModule)
  },
  {
    path: 'user-demandes',
    loadChildren: () => import('../../user-demandes/user-demandes.module').then(m => m.UserDemandesModule)
  },
  {
    path: 'accueil',
    loadChildren: () => import('../../accueil/accueil.module').then(m => m.AccueilModule)
  },
  {
    path: 'activites',
    loadChildren: () => import('../../user-activites/user-activites.module').then(m => m.UserActivitesModule)
  },

  {
    path: 'notifications',
    loadChildren: () => import('../../notifications/notifications.module').then(m => m.NotificationsModule)
  }




];
