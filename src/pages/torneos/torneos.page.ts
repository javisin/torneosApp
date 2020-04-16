import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {LoadingController, PopoverController} from '@ionic/angular';
import {MenuUsuarioComponent} from '../../components/menu-usuario/menu-usuario.component';
import {ListaCategoriasComponent} from './lista-categorias/lista-categorias.component';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {
  private torneos: any[];
  private loading: HTMLIonLoadingElement;

  constructor(private appService: AppService,
              private loadingController: LoadingController,
              private popoverController: PopoverController
              ) {
  }

  ngOnInit() {
    this.appService.getUser().subscribe(async user => {
      if (user !== null) {
        this.loading = await this.loadingController.create({
          message: 'Cargando competiciones...'
        });
        this.loading.present().then(() => {
          this.appService.getTorneos(user).subscribe(res => {
            console.log(res)
            if (res) {
              this.torneos = Object.values(res);
              this.torneos.splice(0, 1); // Intentar resolver de otro modo
              this.loading.dismiss();
            } else {
              console.log('No hay torneos');
            }
          });
        });
      }
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
