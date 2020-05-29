import { Component, OnInit } from '@angular/core';
import {TorneoService} from '../../services/torneo/torneo.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {UserService} from '../../services/user/user.service';
import {Torneo} from '../../services/torneo/torneo';
import {User} from '../../services/user/user';
import {ErrorService} from '../../services/alert/error.service';

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
              private errorService: ErrorService
  ) {
    this.openedTorneos = [];
  }

  ngOnInit() {
    this.userService.getUser().subscribe(async user => {
      if (user !== null) {
        this.user = user;
        await this.loadContent();
      }
    });
  }

  async loadContent() {
    this.loading = await this.loadingController.create({
      message: 'Cargando competiciones...'
    });
    this.loading.present().then(async () => {
      this.torneoService.getInvitaciones(this.user).subscribe(
        async invitations => {
          await this.errorService.checkErrors(invitations);
          this.invitations = invitations;
        },
        async error => {
          const alert = await this.errorService.createErrorAlert(error.message);
          await this.loading.dismiss();
          await alert.present();
        });
      this.torneoService.getTorneos(this.user, false).subscribe(
        async torneo => {
          await this.errorService.checkErrors(torneo);
          this.torneos = torneo;
          await this.loading.dismiss();
        },
        async error => {
          const alert = await this.errorService.createErrorAlert(error.message);
          await this.loading.dismiss();
          await alert.present();
        });
    });
  }

  async doRefresh(e) {
    this.torneoService.getInvitaciones(this.user).subscribe(
      async invitations => {
        await this.errorService.checkErrors(invitations);
        this.invitations = invitations;
      },
      async error => {
        const alert = await this.errorService.createErrorAlert(error.message);
        e.target.complete();
        await alert.present();
      });
    this.torneoService.getTorneos(this.user, false).subscribe(
      async torneo => {
        await this.errorService.checkErrors(torneo);
        this.torneos = torneo;
        e.target.complete();
      },
      async error => {
        const alert = await this.errorService.createErrorAlert(error.message);
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
