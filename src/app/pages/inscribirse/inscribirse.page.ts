import { Component, OnInit } from '@angular/core';
import {TorneoService} from '../../services/torneo/torneo.service';
import {ModalController} from '@ionic/angular';
import {ErrorService} from '../../services/alert/error.service';
import {EquiposListComponent} from './equipos-list/equipos-list.component';

@Component({
  selector: 'app-inscribirse',
  templateUrl: './inscribirse.page.html',
  styleUrls: ['./inscribirse.page.scss'],
})
export class InscribirsePage implements OnInit {
  public torneos: any;

  constructor(private torneoService: TorneoService,
              private modalController: ModalController,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.torneoService.getOpenedTorneos().subscribe(
      torneos => this.torneos = torneos,
      error => this.errorService.createErrorAlert(error.error)
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
