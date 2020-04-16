import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TorneosPageRoutingModule } from './torneos-routing.module';

import { TorneosPage } from './torneos.page';
import {ComponentsModule} from '../../components/components.module';
import {ListaCategoriasComponent} from './lista-categorias/lista-categorias.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorneosPageRoutingModule,
    ComponentsModule
  ],
  entryComponents: [ListaCategoriasComponent],
  declarations: [TorneosPage, ListaCategoriasComponent]
})
export class TorneosPageModule {}
