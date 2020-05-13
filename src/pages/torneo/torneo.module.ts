import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TorneooPageRoutingModule } from './torneo-routing.module';

import { TorneoPage } from './torneo.page';
import {StatsPage} from './stats/stats.page';
import {ResultadosComponent} from './stats/resultados/resultados.component';
import {MisResultadosComponent} from './stats/mis-resultados/mis-resultados.component';
import {ClasificacionComponent} from './stats/clasificacion/clasificacion.component';
import {HideHeaderDirective} from '../../directives/hide-header.directive';
import {AddNotificationComponent} from './stats/add-notification/add-notification.component';
import {ComponentsModule} from '../../components/components.module';
import {NotificacionesPage} from './notificaciones/notificaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorneooPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TorneoPage, StatsPage, ResultadosComponent, MisResultadosComponent, ClasificacionComponent,
    HideHeaderDirective, AddNotificationComponent, NotificacionesPage],
  entryComponents: [AddNotificationComponent]
})
export class TorneoPageModule {}
