import { Component, OnInit } from '@angular/core';
import {TorneoService} from '../../services/torneo/torneo.service';
import {AlertController, IonRouterOutlet, LoadingController} from '@ionic/angular';
import {UserService} from '../../services/user/user.service';
import {Torneo} from '../../services/torneo/torneo';
import {User} from '../../services/user/user';
import {AlertService} from '../../services/alert/alert.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {
  private torneos: Torneo[];
  public filteredTorneos: Torneo[];
  private loading: HTMLIonLoadingElement;
  private user: User;
  public closedTorneos: boolean[];
  public invitations: any[];
  public filter: string;

  constructor(private torneoService: TorneoService,
              private userService: UserService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private alertService: AlertService,
              private nativePageTransitions: NativePageTransitions,
              private ionRouterOutlet: IonRouterOutlet
  ) {
    this.closedTorneos = [];
    this.filter = '0';
  }

  ngOnInit() {
    this.userService.getUser().subscribe(async user => {
      if (user !== null) {
        this.user = user;
        await this.loadContent();
      }
    });
  }
  ionViewWillLeave() {
    if (this.ionRouterOutlet.getLastUrl().includes('/torneos/torneo')) {
      const options: NativeTransitionOptions = {
        direction: 'left',
        duration: 400,
        slowdownfactor: -1,
        iosdelay: 50,
        androiddelay: 50,
      };
      this.nativePageTransitions.slide(options);
    }
  }

  async loadContent() {
    this.loading = await this.loadingController.create({
      message: 'Cargando competiciones...'
    });
    this.loading.present().then(async () => {
      this.fetchContent();
    });
  }
  fetchContent(refreshEvent?) {
    this.torneoService.getInvitaciones(this.user).subscribe(
      async invitations => {
        this.invitations = invitations;
        this.fetchTorneos(refreshEvent);
      },
      async error => {
        const alert = await this.alertService.createErrorAlert(error.error, error.status);
        if (refreshEvent) {
          refreshEvent.target.complete();
        } else {
          await this.loading.dismiss();
        }
        await alert.present();
      });
  }
  fetchTorneos(refreshEvent) {
    this.torneoService.getTorneos(this.user).subscribe(
      async torneos => {
        this.torneos = torneos;
        this.filteredTorneos = this.torneos.filter(torneo => torneo.activo !== this.filter);
        if (refreshEvent) {
          refreshEvent.target.complete();
        } else {
          await this.loading.dismiss();
        }
      },
      async error => {
        const alert = await this.alertService.createErrorAlert(error.error, error.status);
        if (refreshEvent) {
          refreshEvent.target.complete();
        } else {
          await this.loading.dismiss();
        }
        await alert.present();
      });
  }

  toggleTorneo(i) {
    this.closedTorneos[i] = !this.closedTorneos[i];
  }

  filterTorneos(filter) {
    if (filter === 'all') {
      this.filteredTorneos = this.torneos;
      this.filter = null;
    } else {
      this.filteredTorneos = this.torneos.filter(torneo => torneo.activo === '1');
      this.filter = '0';
    }
  }

  async presentAlertConfirm(i) {
    const alert = await this.alertController.create({
      header: 'Invitación',
      message: this.invitations[i].descripcion,
      buttons: [
        {
          text: 'Rechazar',
          handler: () => {
            this.torneoService.responseInvitacion(this.invitations[i].id, 'NOK').subscribe(
              () => this.invitations.splice(i, 1),
              error => this.alertService.createErrorAlert(error.error, error.status)
            );
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.torneoService.responseInvitacion(this.invitations[i].id, 'OK').subscribe(
              () => this.invitations.splice(i, 1),
              error => this.alertService.createErrorAlert(error.error, error.status)
            );
          }
        }
      ]
    });
    await alert.present();
  }
}
