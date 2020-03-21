import {ModuleWithProviders, NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import { TorneoPage } from './torneo.page';
import {ClasificacionComponent} from './clasificacion/clasificacion.component';
import {BarComponent} from '../../app/components/bar/bar.component';
import {MisResultadosComponent} from './mis-resultados/mis-resultados.component';
import {ResultadosComponent} from './resultados/resultados.component';

const routes: Routes = [
  {
    path: '',
    component: TorneoPage,
    children: [
      {
        path: 'clasificacion',
        component: ClasificacionComponent
      },
      {
        path: 'mis-partidos',
        component: MisResultadosComponent
      },
      {
        path: 'partidos',
        component: ResultadosComponent
      },
      {
        path: '',
        redirectTo: 'partidos'
      },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneosPageRoutingModule {}
