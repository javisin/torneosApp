import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {Resultado} from '../../../../services/torneo/resultado';
import {ModalController} from '@ionic/angular';
import {AddResultComponent} from '../add-result/add-result.component';

@Component({
  selector: 'app-mis-resultados',
  templateUrl: './resultados-equipo.component.html',
  styleUrls: ['./resultados-equipo.component.scss'],
})
export class ResultadosEquipoComponent implements OnInit {
  @Input() idCategoria: string;
  @Input() idEquipo: string;
  @Input() canAddResult: boolean;
  public results: Resultado[];
  public torneoType: string;

  constructor(private torneoService: TorneoService,
              private modalController: ModalController) { }

  async ngOnInit() {
    const info = await this.torneoService.getMisResultados(this.idCategoria, this.idEquipo).pipe().toPromise();
    this.results = info.resultados;
    this.torneoType = info.modalidadvisual;
  }
  async presentModal(i) {
    const modal = await this.modalController.create({
      component: AddResultComponent,
      componentProps: {
        idCategoria: this.idCategoria,
        jornada: i + 1,
        nombreEquipo1: this.results[i].equipo1,
        nombreEquipo2: this.results[i].equipo2,
        idEquipo1: this.results[i].idequipo1,
        idEquipo2: this.results[i].idequipo2,
        idPartido: this.results[i].Idpartido,
        torneoType: this.torneoType,
      }
    });
    return await modal.present();
  }

}
