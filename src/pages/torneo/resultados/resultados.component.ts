import { Component, OnInit } from '@angular/core';
import {TorneoService} from '../../../services/torneo/torneo.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  public results: any[];
  public jornada: number;
  private jornadaSubject: BehaviorSubject<number>;

  constructor(private torneoService: TorneoService,
              private route: ActivatedRoute) {
    this.jornadaSubject = new BehaviorSubject<number>(null);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.jornadaSubject.subscribe(jornada => {
        this.torneoService.getTorneo(params.id, jornada).subscribe(torneo => {
          this.results = torneo.resultados;
          this.jornada = Number(torneo.jornada);
        });
      });
    });
  }
  nextJornada() {
    this.jornadaSubject.next(this.jornada + 1);
  }
  previousJornada() {
    this.jornadaSubject.next(this.jornada - 1);
  }
}
