import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogInPageRoutingModule } from './log-in-routing.module';

import { LogInPage } from './log-in.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LogInPageRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        LogInPage
    ],
    declarations: [LogInPage]
})
export class LogInPageModule {}
