import { Component, OnInit } from '@angular/core';
import {TorneoService} from '../../services/torneo/torneo.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {ErrorService} from '../../services/error/error.service';
import {EquiposListComponent} from './equipos-list/equipos-list.component';

@Component({
  selector: 'app-inscribirse',
  templateUrl: './inscribirse.page.html',
  styleUrls: ['./inscribirse.page.scss'],
})
export class InscribirsePage implements OnInit {
  public torneos: any;
  private loading: HTMLIonLoadingElement;

  constructor(private torneoService: TorneoService,
              private modalController: ModalController,
              private loadingController: LoadingController,
              private errorService: ErrorService) { }
  async ngOnInit() {
    await this.loadContent();
  }
  async loadContent(): Promise<void> {
    this.loading = await this.loadingController.create({
      message: 'Cargando competiciones abiertas...'
    });
    this.loading.present().then(async () => {
      this.fetchTorneos();
    });
  }
  fetchTorneos(refreshEvent?) {
    this.torneoService.getOpenedTorneos().subscribe(
      async torneos => {
        this.torneos = torneos;
        if (refreshEvent) {
          refreshEvent.target.complete();
        } else {
          await this.loading.dismiss();
        }
      },
      async error => {
        await this.errorService.createErrorAlert(error.error, error.status);
        if (refreshEvent) {
          refreshEvent.target.complete();
        } else {
          await this.loading.dismiss();
        }
      }
    );
  }
  async presentEquiposModal(idCategoria) {
    const modal = await this.modalController.create({
      component: EquiposListComponent,
      componentProps: {
        idCategoria
      }
    });
    return await modal.present();
  }

}
