import {Component, OnInit} from '@angular/core';
import {NotificacionService} from '../../../services/notificacion/notificacion.service';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../services/user/user';
import {ErrorService} from '../../../services/error/error.service';
import {ActivatedRoute} from '@angular/router';
import {Notificacion} from '../../../services/notificacion/notificacion';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  public readNotificaciones: Notificacion[];
  public unreadNotificaciones: Notificacion[];
  private user: User;
  private idCategoria: string;

  constructor(private notificacionService: NotificacionService,
              private userService: UserService,
              private errorService: ErrorService,
              private route: ActivatedRoute) {
    this.unreadNotificaciones = [];
    this.readNotificaciones = [];
  }
  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.parent.params.id;
    this.user = this.userService.getUser().getValue();
    this.fetchNotificaciones();
  }
  fetchNotificaciones(refreshEvent?): void {
    this.notificacionService.getNotificaciones(this.user, this.idCategoria).subscribe(
      async notificaciones => {
        if (notificaciones.length > 0) {
          this.readNotificaciones = notificaciones.filter(notificacion => notificacion.estado === '1');
          this.unreadNotificaciones = notificaciones.filter(notificacion => notificacion.estado === '0');
          if (this.unreadNotificaciones.length > 0) {
            const notificacionesIds = this.unreadNotificaciones.map(notificacion => notificacion.idnotificacion);
            this.readUnreadNotificaciones(notificacionesIds, refreshEvent);
          } else if (refreshEvent) {
            refreshEvent.target.complete();
          }
        }
      },
      async error => {
        const alert = await this.errorService.createErrorAlert(error.error);
        await alert.present();
      });
  }
  readUnreadNotificaciones(notificacionesIds: string[], refreshEvent?): void {
    this.notificacionService.readNotificaciones(this.user, notificacionesIds).subscribe(
      () => {
        if (refreshEvent) {
          refreshEvent.target.complete();
        }
      },
      async error => {
        const alert = await this.errorService.createErrorAlert(error.error);
        await alert.present();
      }
    );
  }
}
