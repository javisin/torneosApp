import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../services/app.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  private results: any[];
  private jornada: number;
  private jornadaSubject: BehaviorSubject<number>;

  constructor(private appService: AppService,
              private route: ActivatedRoute) {
    this.jornadaSubject = new BehaviorSubject<number>(null);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.jornadaSubject.subscribe(jornada => {
        this.appService.getTorneo(params.id, jornada).subscribe(torneo => {
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
