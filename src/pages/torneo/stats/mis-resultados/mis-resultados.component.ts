import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {Resultado} from '../../../../services/torneo/resultado';
import {ModalController} from '@ionic/angular';
import {AddResultComponent} from '../add-result/add-result.component';

@Component({
  selector: 'app-mis-resultados',
  templateUrl: './mis-resultados.component.html',
  styleUrls: ['./mis-resultados.component.scss'],
})
export class MisResultadosComponent implements OnChanges {
  @Input() idCategoria: string;
  @Input() torneoDetails: any;
  public results: Resultado[];
  public torneoType: string;

  constructor(private torneoService: TorneoService,
              private modalController: ModalController) { }

  async ngOnChanges() {
    if (this.torneoDetails && this.torneoDetails.idequipo !== '') {
      const info = await this.torneoService.getMisResultados(this.idCategoria, this.torneoDetails.idequipo).pipe().toPromise();
      this.results = info.resultados;
      this.torneoType = info.modalidadvisual;
    }
  }
  async presentModal(i) {
    const modal = await this.modalController.create({
      component: AddResultComponent,
      componentProps: {
        equipo1: this.results[i].equipo1,
        equipo2: this.results[i].equipo2,
      }
    });
    return await modal.present();
  }

}
