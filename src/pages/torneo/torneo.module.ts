import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TorneooPageRoutingModule } from './torneo-routing.module';

import { TorneoPage } from './torneo.page';
import {StatsPage} from './stats/stats.page';
import {ResultadosComponent} from './stats/resultados/resultados.component';
import {ResultadosEquipoComponent} from './stats/resultados-equipo/resultados-equipo.component';
import {ClasificacionComponent} from './stats/clasificacion/clasificacion.component';
import {HideHeaderDirective} from '../../directives/hide-header.directive';
import {AddNotificationComponent} from './stats/add-notification/add-notification.component';
import {ComponentsModule} from '../../components/components.module';
import {NotificacionesPage} from './notificaciones/notificaciones.page';
import {AddResultComponent} from './stats/add-result/add-result.component';
import {ResultadosEquipoModalComponent} from './stats/resultados-equipo-modal/resultados-equipo-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorneooPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [TorneoPage, StatsPage, ResultadosComponent, ResultadosEquipoComponent, ClasificacionComponent,
    HideHeaderDirective, AddNotificationComponent, NotificacionesPage, AddResultComponent, ResultadosEquipoModalComponent],
  entryComponents: [AddNotificationComponent, AddResultComponent, ResultadosEquipoModalComponent]
})
export class TorneoPageModule {}
