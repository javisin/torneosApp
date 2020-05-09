import {Component, Input, OnInit} from '@angular/core';
import {TorneoService} from '../../../services/torneo/torneo.service';
import {BehaviorSubject} from 'rxjs';
import {ModalController, PopoverController} from '@ionic/angular';
import {AddNotificationComponent} from '../add-notification/add-notification.component';

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

  constructor(private torneoService: TorneoService,
              private popoverController: PopoverController) {
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
  async presentModal(i) {
    const modal = await this.popoverController.create({
      component: AddNotificationComponent,
      componentProps: {
        equipo1: this.results[i].equipo1,
        result1: this.results[i].rdo1,
        equipo2: this.results[i].equipo2,
        result2: this.results[i].rdo2,
      },
      cssClass: 'ionic-w-80',
    });
    return await modal.present();
  }
}
