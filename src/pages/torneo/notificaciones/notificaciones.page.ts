import {Component, OnInit} from '@angular/core';
import {NotificacionService} from '../../../services/notificacion/notificacion.service';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../services/user/user';
import {ErrorService} from '../../../services/alert/error.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  public notificaciones: any[];
  private user: User;
  private idCategoria: string;

  constructor(private notificacionService: NotificacionService,
              private userService: UserService,
              private errorService: ErrorService,
              private route: ActivatedRoute) { }

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
        e.target.complete();
      },
      async error => {
        const alert = await this.errorService.createErrorAlert(error);
        e.target.complete();
        await alert.present();
      });
  }

}
