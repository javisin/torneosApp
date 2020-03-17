import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TorneosPageRoutingModule } from './torneos-routing.module';

import { TorneosPage } from './torneos.page';
import {ResultadosComponent} from '../resultados/resultados.component';
import {MisResultadosComponent} from '../mis-resultados/mis-resultados.component';
import {ClasificacionComponent} from '../clasificacion/clasificacion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorneosPageRoutingModule
  ],
    declarations: [TorneosPage, ResultadosComponent, MisResultadosComponent, ClasificacionComponent]
})
export class TorneosPageModule {}
