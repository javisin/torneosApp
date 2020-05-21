import {Component, OnInit} from '@angular/core';
import {NotificacionService} from '../../../services/notificacion/notificacion.service';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../services/user/user';
import {AlertService} from '../../../services/alert/alert.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  public notificaciones: any[];
  private user: User;

  constructor(private notificacionService: NotificacionService,
              private userService: UserService,
              private alertService: AlertService) { }

  ngOnInit() {
    const user = this.userService.getUser().getValue();
    this.notificacionService.getNotificaciones(user).subscribe(res => this.checkNotificaciones(res));
  }
  async checkNotificaciones(res) {
    if (res.Error) {
      const alert = await this.alertService.createErrorAlert(res.Error);
      await alert.present();
    } else {
      if (res.length > 0) {
        this.notificaciones = res;
      }
    }
  }
  async doRefresh(e) {
    this.notificacionService.getNotificaciones(this.user).subscribe(res => {
      this.checkNotificaciones(res);
      e.target.complete();
    });
  }

}
