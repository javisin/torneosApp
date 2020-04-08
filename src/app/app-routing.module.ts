import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../pages/log-in/log-in.module').then(m => m.LogInPageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('../pages/log-in/log-in.module').then(m => m.LogInPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('../pages/inicio/inicio.module').then(m => m.InicioPageModule),
  },
  {
    path: 'torneos',
    loadChildren: () => import('../pages/torneos/torneos.module').then(m => m.TorneosPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'torneos/torneo',
    loadChildren: () => import('../pages/torneo/torneo.module').then(m => m.TorneosPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('../pages/registro/registro.module').then(m => m.RegistroPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
