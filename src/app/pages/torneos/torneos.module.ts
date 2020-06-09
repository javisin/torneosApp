import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TorneosPageRoutingModule } from './torneos-routing.module';

import { TorneosPage } from './torneos.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TorneosPageRoutingModule,
    SharedModule
  ],
  declarations: [TorneosPage]
})
export class TorneosPageModule {}
