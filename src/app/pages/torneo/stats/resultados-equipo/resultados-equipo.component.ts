import {Component, Input, OnInit} from '@angular/core';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {Resultado} from '../../../../services/torneo/resultado';
import {ModalController} from '@ionic/angular';
import {AddResultadoComponent} from '../add-resultado/add-resultado.component';
import {ResultadosEquipoModalComponent} from '../resultados-equipo-modal/resultados-equipo-modal.component';
import {RefreshService} from '../../../../services/refresh/refresh.service';

@Component({
  selector: 'app-resultados-equipo',
  templateUrl: './resultados-equipo.component.html',
  styleUrls: ['./resultados-equipo.component.scss'],
})
export class ResultadosEquipoComponent implements OnInit {
  @Input() idCategoria: string;
  @Input() idEquipo: string;
  @Input() modal: boolean;
  @Input() categoriaType: string;
  public results: Resultado[];
  public modality: string;
  public canAddResult: boolean;

  constructor(private torneoService: TorneoService,
              private modalController: ModalController,
              private refreshService: RefreshService) { }

  async ngOnInit(): Promise<void> {
    await this.getResults();
    this.refreshService.getSubject().subscribe(() => this.getResults());
  }
  async getResults(): Promise<void> {
    if (this.idEquipo) {
      const info = await this.torneoService.getMisResultados(this.idCategoria, this.idEquipo, this.categoriaType)
        .pipe().toPromise();
      this.results = info.resultados;
      this.canAddResult = info.puedeactualizar === 'Si';
      if (this.categoriaType === '1') {
        this.modality = 'sets';
      } else {
        this.modality = info.modalidadvisual;
      }
    }
  }
  async presentAddResultModal(i: number) {
    const modal = await this.modalController.create({
      component: AddResultadoComponent,
      componentProps: {
        idCategoria: this.idCategoria,
        jornada: i + 1,
        nombreEquipo1: this.results[i].equipo1,
        nombreEquipo2: this.results[i].equipo2,
        idEquipo1: this.results[i].idequipo1,
        idEquipo2: this.results[i].idequipo2,
        idPartido: this.results[i].Idpartido,
        modality: this.modality,
        type: this.categoriaType,
      }
    });
    return await modal.present();
  }
  async presentResultadosEquipoModal(idEquipo: string) {
    if (!this.modal) {
      const modal = await this.modalController.create({
        component: ResultadosEquipoModalComponent,
        componentProps: {
          idCategoria: this.idCategoria,
          idEquipo,
          categoriaType: this.categoriaType
        }
      });
      return await modal.present();
    }
  }
}
