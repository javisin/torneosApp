import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';
import { SharedModule} from '../../shared/shared.module';
import {NickInfoComponent} from './nick-info/nick-info.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegistroPageRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
  declarations: [RegistroPage, NickInfoComponent]
})
export class RegistroPageModule {}
