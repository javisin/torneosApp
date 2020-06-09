import {Component, Input, OnInit} from '@angular/core';
import {Notificacion} from '../../../../services/notificacion/notificacion';
import {ConfirmResultadoComponent} from '../confirm-resultado/confirm-resultado.component';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-notificacion-list',
  templateUrl: './notificacion-list.component.html',
  styleUrls: ['./notificacion-list.component.scss'],
})
export class NotificacionListComponent implements OnInit {
  @Input() notificaciones: Notificacion[];
  @Input() title: string;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}
  async confirmResultado(i) {
    const modal = await this.popoverController.create({
      component: ConfirmResultadoComponent,
      componentProps: {
        idPartido: this.notificaciones[i].idpartido,
        idCategoria: this.notificaciones[i].idcategoria,
        result1: this.notificaciones[i].rdo1,
        result2: this.notificaciones[i].rdo2,
        equipo1: this.notificaciones[i].equipo1,
        equipo2: this.notificaciones[i].equipo2,
      },
      cssClass: 'ionic-w-80',
    });
    modal.onDidDismiss().then(details => {
      this.notificaciones[i].estadovalidacion = details.data.notificacionStatus;
    });
    return await modal.present();
  }

}
