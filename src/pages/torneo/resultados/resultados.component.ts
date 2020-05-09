import {Component, Input, OnInit} from '@angular/core';
import {TorneoService} from '../../../services/torneo/torneo.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  @Input() idTorneo: string;
  public results: any[];
  public jornada: number;
  private jornadaSubject: BehaviorSubject<number>;

  constructor(private torneoService: TorneoService) {
    this.jornadaSubject = new BehaviorSubject<number>(null);
  }

  ngOnInit() {
    this.jornadaSubject.subscribe(jornada => {
      this.torneoService.getTorneo(this.idTorneo, jornada).subscribe(torneo => {
        this.results = torneo.resultados;
        this.jornada = Number(torneo.jornada);
      });
    });
  }
  nextJornada() {
    // comparar con el total
    this.jornadaSubject.next(this.jornada + 1);
  }
  previousJornada() {
    if (this.jornada > 1) { this.jornadaSubject.next(this.jornada - 1); }
  }
  }
}
