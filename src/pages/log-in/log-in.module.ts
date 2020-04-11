import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppModule} from '../../app/app.module';

import { IonicModule } from '@ionic/angular';

import { LogInPageRoutingModule } from './log-in-routing.module';

import { LogInPage } from './log-in.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LogInPageRoutingModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
    exports: [
        LogInPage
    ],
    declarations: [LogInPage]
})
export class LogInPageModule {}
