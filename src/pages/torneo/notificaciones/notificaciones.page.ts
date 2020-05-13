import { Component, OnInit } from '@angular/core';
import {NotificacionService} from '../../../services/notificacion/notificacion.service';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../services/user/user';
import {AlertController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {createErrorAlert} from '../../../helpers/createErrorAlert';

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
              private alertController: AlertController,
              private storage: Storage,
              private router: Router) { }

  ngOnInit() {
    this.userService.getUser().subscribe(async user => {
      if (user !== null) {
        this.user = user;
        this.notificacionService.getNotificaciones(user).subscribe(res => this.checkNotificaciones(res));
      }
    });
  }
  async checkNotificaciones(res) {
    if (res.Error) {
      const alert = await createErrorAlert(res.Error, this.alertController, this.userService, this.storage, this.router);
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
