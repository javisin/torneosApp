import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscribirsePageRoutingModule } from './inscribirse-routing.module';

import { InscribirsePage } from './inscribirse.page';
import {SharedModule} from '../../shared/shared.module';
import {EquiposListComponent} from './equipos-list/equipos-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscribirsePageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [InscribirsePage, EquiposListComponent]
})
export class InscribirsePageModule {}
