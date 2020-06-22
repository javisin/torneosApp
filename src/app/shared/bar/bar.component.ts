import { Component } from '@angular/core';
import { PopoverController} from '@ionic/angular';
import {MenuUsuarioComponent} from '../menu-usuario/menu-usuario.component';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent {

  constructor(public popoverController: PopoverController) { }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuUsuarioComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
