import {Component, Input, OnInit} from '@angular/core';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {BehaviorSubject} from 'rxjs';
import {ModalController, PopoverController} from '@ionic/angular';
import {AddNotificationComponent} from '../add-notification/add-notification.component';
import {Resultado} from '../../../../services/torneo/resultado';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {AddResultComponent} from '../add-result/add-result.component';
import {ResultadosEquipoComponent} from '../resultados-equipo/resultados-equipo.component';
import {ResultadosEquipoModalComponent} from '../resultados-equipo-modal/resultados-equipo-modal.component';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  @Input() idCategoria: string;
  public results: Resultado[];
  public jornada: number;
  public totalJornadas: number;
  private jornadaSubject: BehaviorSubject<number>;
  public torneoType: string;

  constructor(private torneoService: TorneoService,
              private popoverController: PopoverController,
              private modalController: ModalController,
              private localNotifications: LocalNotifications) {
    this.jornadaSubject = new BehaviorSubject<number>(null);
  }

  ngOnInit() {
    this.jornadaSubject.subscribe(jornada => {
      this.torneoService.getResultados(this.idCategoria, jornada).subscribe(torneo => {
        this.results = torneo.resultados;
        this.results.map(async result => {
          if (await this.localNotifications.isScheduled(Number(result.Idpartido))) {
            result.isScheduled = true;
          }
        });
        this.torneoType = torneo.modalidadvisual;
        this.totalJornadas = Number(torneo.totaljornadas);
        this.jornada = Number(torneo.jornada);
      });
    });
  }
  nextJornada() {
    if (this.jornada < this.totalJornadas) {
    this.jornadaSubject.next(this.jornada + 1);
    }
  }
  previousJornada() {
    if (this.jornada > 1) {
      this.jornadaSubject.next(this.jornada - 1);
    }
  }
  async createNotification(i) {
    const modal = await this.popoverController.create({
      component: AddNotificationComponent,
      componentProps: {
        idPartido: this.results[i].Idpartido,
        equipo1: this.results[i].equipo1,
        equipo2: this.results[i].equipo2,
        fecha: this.results[i].fechapartido,
        idCategoria: this.idCategoria,
      },
      cssClass: 'ionic-w-80',
    });
    modal.onDidDismiss().then(details => {
      if (details.data.isScheduled) {
        this.results[i].isScheduled = true;
      }
    });
    return await modal.present();
  }
  async presentModal(idEquipo) {
    const modal = await this.modalController.create({
      component: ResultadosEquipoModalComponent,
      componentProps: {
        idCategoria: this.idCategoria,
        idEquipo,
      }
    });
    return await modal.present();
  }
}
