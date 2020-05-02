import { Component, OnInit } from '@angular/core';
import {TorneoService} from '../../services/torneo/torneo.service';
import {AlertController, LoadingController, PopoverController} from '@ionic/angular';
import {ListaCategoriasComponent} from './lista-categorias/lista-categorias.component';
import {UserService} from '../../services/user/user.service';
import {Torneo} from '../../services/torneo/torneo';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {User} from '../../services/user/user';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {
  public torneos: Torneo[];
  private loading: HTMLIonLoadingElement;
  private user: User;

  constructor(private torneoService: TorneoService,
              private userService: UserService,
              private loadingController: LoadingController,
              private popoverController: PopoverController,
              private alertController: AlertController,
              private storage: Storage,
              private router: Router
              ) {
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
      this.torneoService.getTorneos(user).subscribe(res => this.checkTorneos(res));
      await this.loading.dismiss();
    });
  }
  async checkTorneos(res) {
    if (res.Error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: res.Error,
        buttons: [
          {
            text: 'OK',
            handler: async () => {
              await this.storage.remove('user');
              this.userService.updateUser(null);
              await this.router.navigate(['/log-in']);
            }
          },
        ],
        translucent: true,
      });
      await alert.present();
    } else {
      if (res.length > 0) {
        this.torneos = res;
      }
    }
  }
  async doRefresh(e) {
    this.torneoService.getTorneos(this.user).subscribe(res => {
      this.checkTorneos(res);
      e.target.complete();
    });
  }
  async presentPopover(ev: any, idTorneo) {
    const popover = await this.popoverController.create({
      component: ListaCategoriasComponent,
      componentProps: {idTorneo},
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
