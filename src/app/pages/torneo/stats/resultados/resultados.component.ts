import {Component, Input, OnInit} from '@angular/core';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {BehaviorSubject} from 'rxjs';
import {ModalController, Platform, PopoverController} from '@ionic/angular';
import {AddNotificacionComponent} from '../add-notificacion/add-notificacion.component';
import {Resultado} from '../../../../services/torneo/resultado';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {ResultadosEquipoModalComponent} from '../resultados-equipo-modal/resultados-equipo-modal.component';
import {RefreshService} from '../../../../services/refresh/refresh.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  @Input() idCategoria: string;
  @Input() categoriaType: string;
  public results: Resultado[];
  public round: number;
  public totalRounds: number;
  private roundSubject: BehaviorSubject<number>;
  public modality: string;
  public playOffRounds: any;
  public options: any;

  constructor(private torneoService: TorneoService,
              private popoverController: PopoverController,
              private modalController: ModalController,
              private localNotifications: LocalNotifications,
              private platform: Platform,
              private refreshService: RefreshService) {
    this.roundSubject = new BehaviorSubject<number>(null);
  }

  ngOnInit() {
    this.getTorneo();
    this.refreshService.getSubject().subscribe(() => this.getTorneo());
  }
  getTorneo() {
    if (this.platform.is('ios')) {
      this.options = {
        cssClass: 'ionic-w-60'
      };
    }
    this.roundSubject.subscribe(round => {
      this.torneoService.getResultados(this.idCategoria, this.categoriaType, round).subscribe(torneo => {
        this.results = torneo.resultados;
        this.checkScheduledNotifications();
        this.getRoundDetails(torneo);
      });
    });
  }
  checkScheduledNotifications() {
    this.results.map(async result => {
      if (await this.localNotifications.isScheduled(Number(result.Idpartido))) {
        result.isScheduled = true;
      }
    });
  }
  getRoundDetails(torneo) {
    if (this.categoriaType === '1') {
      this.modality = 'sets';
      this.totalRounds = Number(torneo.totalfases);
      this.round = Number(torneo.fase);
      this.setPlayOffRounds();
    } else {
      this.modality = torneo.modalidadvisual;
      this.totalRounds = Number(torneo.totaljornadas);
      this.round = Number(torneo.jornada);
    }
  }
  setPlayOffRounds() {
    this.playOffRounds = {
      names: ['Final', 'Semifinal', 'Cuartos de final', 'Octavos de final', '16avos de final'],
      values: [ ...Array(this.totalRounds - 1).keys() ].map( i => i + 2),
    };
  }
  nextJornada() {
    if (this.round < this.totalRounds) {
    this.roundSubject.next(this.round + 1);
    }
  }
  previousJornada() {
    if (this.round > 1) {
      this.roundSubject.next(this.round - 1);
    }
  }
  selectRound(event) {
    this.roundSubject.next(event.detail.value);
  }
  async createNotification(i) {
    const modal = await this.popoverController.create({
      component: AddNotificacionComponent,
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
  async presentResultadosEquipoModal(idEquipo) {
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
