import {Component, Input, OnInit} from '@angular/core';
import {TorneoService} from '../../../../services/torneo/torneo.service';

@Component({
  selector: 'app-mis-resultados',
  templateUrl: './mis-resultados.component.html',
  styleUrls: ['./mis-resultados.component.scss'],
})
export class MisResultadosComponent implements OnInit {
  @Input() idTorneo: string;

  constructor(private torneoService: TorneoService) { }

  ngOnInit() {
  }

}
