import { Component, OnInit } from '@angular/core';
import {TorneoService} from '../../services/torneo/torneo.service';
import {LoadingController, PopoverController} from '@ionic/angular';
import {ListaCategoriasComponent} from './lista-categorias/lista-categorias.component';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {
  public torneos: any[];
  private loading: HTMLIonLoadingElement;

  constructor(private torneoService: TorneoService,
              private userService: UserService,
              private loadingController: LoadingController,
              private popoverController: PopoverController
              ) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(async user => {
      if (user !== null) {
        this.loading = await this.loadingController.create({
          message: 'Cargando competiciones...'
        });
        this.loading.present().then(() => {
          this.torneoService.getTorneos(user).subscribe(res => this.checkTorneos(res));
        });
      }
    });
  }
  async checkTorneos(res) {
    if (res) {
      this.torneos = res.torneos;
      await this.loading.dismiss();
    } else {
      console.log('No hay torneos');
    }
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
