import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TorneosPageRoutingModule } from './torneos-routing.module';

import { TorneosPage } from './torneos.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TorneosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TorneosPage]
})
export class TorneosPageModule {}
