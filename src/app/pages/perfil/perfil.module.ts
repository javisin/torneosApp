import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import {SharedModule} from '../../shared/shared.module';
import {ChangePasswordComponent} from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [PerfilPage, ChangePasswordComponent]
})
export class PerfilPageModule {}
