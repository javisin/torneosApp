import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule} from '@ionic/angular';

import { TorneosPageRoutingModule } from './torneo-routing.module';

import { TorneoPage } from './torneo.page';
import {ResultadosComponent} from './resultados/resultados.component';
import {MisResultadosComponent} from './mis-resultados/mis-resultados.component';
import {ClasificacionComponent} from './clasificacion/clasificacion.component';
import {ComponentsModule} from '../../components/components.module';
import {HideHeaderDirective} from '../../directives/hide-header.directive';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {AddNotificationComponent} from './add-notification/add-notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorneosPageRoutingModule,
    ComponentsModule
  ],
  providers: [ScreenOrientation],
  declarations: [TorneoPage, ResultadosComponent, MisResultadosComponent, ClasificacionComponent,
    HideHeaderDirective, AddNotificationComponent],
  entryComponents: [AddNotificationComponent]
})
export class TorneosPageModule {}
