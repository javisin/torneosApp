import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule} from '@ionic/angular';

import { TorneosPageRoutingModule } from './torneo-routing.module';

import { TorneoPage } from './torneo.page';
import {ResultadosComponent} from './resultados/resultados.component';
import {MisResultadosComponent} from './mis-resultados/mis-resultados.component';
import {ClasificacionComponent} from './clasificacion/clasificacion.component';
import {ComponentsModule} from '../../app/components/components.module';
import {HideHeaderDirective} from '../../app/directives/hide-header.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorneosPageRoutingModule,
    ComponentsModule
  ],

  declarations: [TorneoPage, ResultadosComponent, MisResultadosComponent, ClasificacionComponent, HideHeaderDirective]
})
export class TorneosPageModule {}
