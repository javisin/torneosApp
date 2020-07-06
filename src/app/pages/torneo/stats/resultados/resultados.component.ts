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
  public rounds: any;
  public options: any;

  constructor(private torneoService: TorneoService,
              private popoverController: PopoverController,
              private modalController: ModalController,
              private localNotifications: LocalNotifications,
              private platform: Platform,
              private refreshService: RefreshService) {
    this.roundSubject = new BehaviorSubject<number>(null);
  }
  ngOnInit(): void {
    this.fetchJornada();
    this.refreshService.getSubject().subscribe(() => this.fetchJornada());
  }
  fetchJornada(): void {
    if (this.platform.is('ios')) {
      this.options = {
        cssClass: 'ionic-w-60'
      };
    }
    this.roundSubject.subscribe(round => {
      this.torneoService.getJornada(this.idCategoria, this.categoriaType, round).subscribe(jornada => {
        this.results = jornada.resultados;
        this.checkScheduledNotifications();
        this.fetchRoundDetails(jornada);
      });
    });
  }
  checkScheduledNotifications(): void {
    this.results.map(async result => {
      if (await this.localNotifications.isScheduled(Number(result.Idpartido))) {
        result.isScheduled = true;
      }
    });
  }
  fetchRoundDetails(jornada): void {
    if (this.categoriaType === '1') {
      this.modality = 'sets';
      this.totalRounds = Number(jornada.totalfases);
      this.round = Number(jornada.fase);
      this.setPlayOffRounds();
    } else {
      this.modality = jornada.modalidadvisual;
      this.totalRounds = Number(jornada.totaljornadas);
      this.round = Number(jornada.jornada);
      this.setLeagueRounds();
    }
  }
  setPlayOffRounds(): void {
    this.rounds = {
      names: ['Final', 'Semifinal', 'Cuartos de final', 'Octavos de final', '16avos de final'],
      values: [...Array(this.totalRounds - 1).keys()].map(i => i + 2),
    };
  }
  setLeagueRounds(): void {
    this.rounds = [...Array(this.totalRounds).keys()].map(i => i + 1);
  }
  nextJornada() {
    if (this.round < this.totalRounds) {
      this.roundSubject.next(this.round + 1);
    }
  }
  previousJornada(): void {
    if (this.round > 1) {
      this.roundSubject.next(this.round - 1);
    }
  }
  selectRound(event): void {
    this.roundSubject.next(event.detail.value);
  }
  async createNotification(i: number) {
    const modal = await this.popoverController.create({
      component: AddNotificacionComponent,
      componentProps: {
        idPartido: this.results[i].Idpartido,
        equipo1: this.results[i].equipo1,
        equipo2: this.results[i].equipo2,
        fecha: this.results[i].fechapartido,
        hora: this.results[i].horapartido,
        idCategoria: this.idCategoria,
        isScheduled: this.results[i].isScheduled,
      },
      cssClass: 'ionic-w-80',
    });
    modal.onDidDismiss().then(details => {
      this.results[i].isScheduled = details.data.isScheduled;
    });
    return await modal.present();
  }
  async presentResultadosEquipoModal(idEquipo: string) {
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
