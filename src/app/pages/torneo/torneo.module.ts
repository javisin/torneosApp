import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TorneoPage } from './torneo.page';
import {StatsPage} from './stats/stats.page';
import {ResultadosComponent} from './stats/resultados/resultados.component';
import {ResultadosEquipoComponent} from './stats/resultados-equipo/resultados-equipo.component';
import {ClasificacionComponent} from './stats/clasificacion/clasificacion.component';
import {HideHeaderDirective} from '../../directives/hide-header.directive';
import {AddNotificacionComponent} from './stats/add-notificacion/add-notificacion.component';
import {SharedModule} from '../../shared/shared.module';
import {NotificacionesPage} from './notificaciones/notificaciones.page';
import {AddResultadoComponent} from './stats/add-resultado/add-resultado.component';
import {ResultadosEquipoModalComponent} from './stats/resultados-equipo-modal/resultados-equipo-modal.component';
import {TorneoPageRoutingModule} from './torneo-routing.module';
import {ConfirmResultadoComponent} from './notificaciones/confirm-resultado/confirm-resultado.component';
import {NotificacionListComponent} from './notificaciones/notificacion-list/notificacion-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorneoPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [TorneoPage, StatsPage, ResultadosComponent, ResultadosEquipoComponent, ClasificacionComponent,
    HideHeaderDirective, AddNotificacionComponent, NotificacionesPage, NotificacionListComponent,
    AddResultadoComponent, ResultadosEquipoModalComponent, ConfirmResultadoComponent],
  entryComponents: [AddNotificacionComponent, AddResultadoComponent,
    ResultadosEquipoModalComponent, ConfirmResultadoComponent]
})
export class TorneoPageModule {}
