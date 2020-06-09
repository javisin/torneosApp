import { NgModule } from '@angular/core';

import { BarComponent } from './bar/bar.component';
import {MenuUsuarioComponent} from './menu-usuario/menu-usuario.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [BarComponent, MenuUsuarioComponent],
  imports: [IonicModule],
  exports: [BarComponent, MenuUsuarioComponent],
  entryComponents: [MenuUsuarioComponent]
})
export class SharedModule {}
