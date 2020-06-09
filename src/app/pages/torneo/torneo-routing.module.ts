import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TorneoPage } from './torneo.page';
import {StatsPage} from './stats/stats.page';
import {NotificacionesPage} from './notificaciones/notificaciones.page';

const routes: Routes = [
  {
    path: ':id',
    component: TorneoPage,
    children: [
      {
        path: 'stats',
        component: StatsPage,
      },
      {
        path: 'notifications',
        component: NotificacionesPage,
      },
      {
        path: '',
        redirectTo: 'stats'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneoPageRoutingModule {}
