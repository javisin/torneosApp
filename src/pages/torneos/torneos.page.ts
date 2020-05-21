import { Component, OnInit } from '@angular/core';
import {TorneoService} from '../../services/torneo/torneo.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {UserService} from '../../services/user/user.service';
import {Torneo} from '../../services/torneo/torneo';
import {User} from '../../services/user/user';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {
  public torneos: Torneo[];
  private loading: HTMLIonLoadingElement;
  private user: User;
  public openedTorneos: boolean[];
  public invitations: any[];

  constructor(private torneoService: TorneoService,
              private userService: UserService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private alertService: AlertService
  ) {
    this.openedTorneos = [];
  }

  ngOnInit() {
    this.userService.getUser().subscribe(async user => {
      if (user !== null) {
        this.user = user;
        await this.searchTorneos(user);
      }
    });
  }

  async searchTorneos(user) {
    this.loading = await this.loadingController.create({
      message: 'Cargando competiciones...'
    });
    this.loading.present().then(async () => {
      this.torneoService.getInvitaciones(user).subscribe(
        res => this.invitations = res,
        async error => {
          const alert = await this.alertService.createErrorAlert(error.message);
          await this.loading.dismiss();
          await alert.present();
        });
      this.torneoService.getTorneos(user).subscribe(
        async res => {
          await this.checkTorneos(res);
          await this.loading.dismiss();
        },
        async error => {
          const alert = await this.alertService.createErrorAlert(error.message);
          await this.loading.dismiss();
          await alert.present();
        });
    });
  }

  async checkTorneos(res) {
    if (res.Error) {
      const alert = await this.alertService.createErrorAlert(res.Error);
      await alert.present();
    } else {
      if (res.length > 0) {
        this.torneos = res;
      }
    }
  }
  async doRefresh(e) {
    this.torneoService.getTorneos(this.user).subscribe(
      res => {
        this.checkTorneos(res);
        e.target.complete();
      },
      async error => {
        const alert = await this.alertService.createErrorAlert(error.message);
        e.target.complete();
        await alert.present();
      });
  }

  toggleTorneo(i) {
    this.openedTorneos[i] = !this.openedTorneos[i];
  }

  async presentAlertConfirm(i) {
    const alert = await this.alertController.create({
      header: 'Invitación',
      message: this.invitations[i].descripcion,
      buttons: [
        {
          text: 'Rechazar',
          handler: () => {
            this.torneoService.responseInvitacion(this.user, this.invitations[i].id, 'NOK').subscribe(
              () => this.invitations.splice(i, 1),
              error => console.log(error),
            );
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.torneoService.responseInvitacion(this.user, this.invitations[i].id, 'OK').subscribe(
              () => this.invitations.splice(i, 1),
              error => console.log(error),
            );
          }
        }
      ]
    });
    await alert.present();
  }
}
