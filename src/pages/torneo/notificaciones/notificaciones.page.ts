import {Component, OnInit} from '@angular/core';
import {NotificacionService} from '../../../services/notificacion/notificacion.service';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../services/user/user';
import {AlertService} from '../../../services/alert/alert.service';
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
              private alertService: AlertService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.idCategoria = this.route.snapshot.parent.params.id;
    const user = this.userService.getUser().getValue();
    this.notificacionService.getNotificaciones(user, this.idCategoria).subscribe(
      notificaciones => this.checkNotificaciones(notificaciones));
  }
  async checkNotificaciones(notificaciones) {
    if (notificaciones.Error) {
      const alert = await this.alertService.createErrorAlert(notificaciones.Error);
      await alert.present();
    } else {
      if (notificaciones.length > 0) {
        this.notificaciones = notificaciones;
      }
    }
  }
  async doRefresh(e) {
    this.notificacionService.getNotificaciones(this.user, this.idCategoria).subscribe(res => {
      this.checkNotificaciones(res);
      e.target.complete();
    });
  }

}
