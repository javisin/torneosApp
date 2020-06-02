import {Component, OnInit} from '@angular/core';
import {NotificacionService} from '../../../services/notificacion/notificacion.service';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../services/user/user';
import {ErrorService} from '../../../services/alert/error.service';
import {ActivatedRoute} from '@angular/router';
import {Notificacion} from '../../../services/notificacion/notificacion';
import {PopoverController} from '@ionic/angular';
import {ConfirmResultadoComponent} from './confirm-resultado/confirm-resultado.component';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  public notificaciones: Notificacion[];
  private user: User;
  private idCategoria: string;

  constructor(private notificacionService: NotificacionService,
              private userService: UserService,
              private errorService: ErrorService,
              private route: ActivatedRoute,
              private popoverController: PopoverController) { }

  ngOnInit() {
    this.idCategoria = this.route.snapshot.parent.params.id;
    this.user = this.userService.getUser().getValue();
    this.fetchNotificaciones();
  }

  fetchNotificaciones() {
    this.notificacionService.getNotificaciones(this.user, this.idCategoria).subscribe(
      async notificaciones => {
        await this.errorService.checkErrors(notificaciones);
        this.notificaciones = notificaciones;
        if (this.notificaciones.length > 0) {
          const notificacionesIds = this.notificaciones.map(notificacion => notificacion.idnotificacion);
          this.notificacionService.readNotificaciones(this.user, notificacionesIds).subscribe(
            () => null,
            error => this.errorService.createErrorAlert(error)
          );
        }
      },
      async error => {
        const alert = await this.errorService.createErrorAlert(error);
        await alert.present();
      });
  }

  async doRefresh(e) {
    this.notificacionService.getNotificaciones(this.user, this.idCategoria).subscribe(
      async notificaciones => {
        await this.errorService.checkErrors(notificaciones);
        this.notificaciones = notificaciones;
        console.log(this.notificaciones[0].timestamp);
        e.target.complete();
      },
      async error => {
        const alert = await this.errorService.createErrorAlert(error);
        e.target.complete();
        await alert.present();
      });
  }
  async confirmResultado(i) {
    const modal = await this.popoverController.create({
      component: ConfirmResultadoComponent,
      componentProps: {
        idPartido: this.notificaciones[i].idpartido,
        idCategoria: this.notificaciones[i].idtorneo,
        result1: this.notificaciones[i].rdo1,
        result2: this.notificaciones[i].rdo2,
        equipo1: this.notificaciones[i].equipo1,
        equipo2: this.notificaciones[i].equipo2,
      },
      cssClass: 'ionic-w-80',
    });
    return await modal.present();
  }

}
