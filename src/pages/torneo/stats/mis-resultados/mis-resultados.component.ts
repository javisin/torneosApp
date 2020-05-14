import {Component, Input, OnChanges} from '@angular/core';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {Resultado} from '../../../../services/torneo/resultado';

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

  constructor(private torneoService: TorneoService) { }

  async ngOnChanges() {
    if (this.torneoDetails && this.torneoDetails.idequipo !== '') {
      const info = await this.torneoService.getMisResultados(this.idCategoria, this.torneoDetails.idequipo).pipe().toPromise();
      this.results = info.resultados;
      this.torneoType = info.modalidadvisual;
    }
  }

}
