import {Component, Input, OnInit} from '@angular/core';
import {Notificacion} from '../../../../services/notificacion/notificacion';
import {ConfirmResultadoComponent} from '../confirm-resultado/confirm-resultado.component';
import {PopoverController} from '@ionic/angular';
import {NotificacionService} from '../../../../services/notificacion/notificacion.service';
import {AlertService} from '../../../../services/alert/alert.service';

@Component({
  selector: 'app-notificacion-list',
  templateUrl: './notificacion-list.component.html',
  styleUrls: ['./notificacion-list.component.scss'],
})
export class NotificacionListComponent implements OnInit {
  @Input() notificaciones: Notificacion[];
  @Input() title: string;

  constructor(private popoverController: PopoverController,
              private notificacionService: NotificacionService,
              private alertService: AlertService) { }

  ngOnInit() {}
  async confirmResultado(i): Promise<void> {
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
  deleteNotification(i): void {
    this.notificacionService.deleteNotificacion(this.notificaciones[i].idnotificacion).subscribe(
      () => this.notificaciones.splice(i, 1),
      error => this.alertService.createErrorAlert(error.error, error.status)
    );
  }

}
