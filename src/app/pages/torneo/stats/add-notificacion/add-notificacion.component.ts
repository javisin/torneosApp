import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {IonSegment, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notificacion.component.html',
  styleUrls: ['./add-notificacion.component.scss'],
})
export class AddNotificacionComponent implements OnInit {
  @Input() idPartido: number;
  @Input() equipo1: string;
  @Input() equipo2: string;
  @Input() fecha: string;
  @Input() hora: string;
  @Input() idCategoria: string;
  @Input() isScheduled: boolean;
  @ViewChild(IonSegment) segment: IonSegment;
  public anticipationMessage: string;
  public finished: boolean;
  private matchTime: number;
  constructor(private localNotifications: LocalNotifications,
              private popoverController: PopoverController
              ) {
    this.finished = false;
  }
  async ngOnInit(): Promise<void> {
    this.matchTime = this.getDateTime(this.fecha, this.hora);
    if (this.fecha !== '') {
      if (Date.now() > this.matchTime) {
        this.finished = true;
      } else {
        if (this.isScheduled) {
          this.anticipationMessage = await this.getAnticipationMessage();
        }
      }
    }
  }
  async dismissPopover(): Promise<void>  {
   await this.popoverController.dismiss({
     isScheduled: this.isScheduled,
    });
  }
  async cancelNotification(): Promise<void>  {
    await this.localNotifications.cancel(this.idPartido);
    this.isScheduled = false;
    await this.dismissPopover();
  }
  async createNotification(): Promise<void>  {
    const value = this.segment.value;
    let text: string;
    let anticipation: string;
    let notificationDate: Date;
    switch (value) {
      case 'none': {
        text = `Comienzo del partido`;
        notificationDate = new Date(this.matchTime);
        anticipation = 'none';
        break;
      }
      case 'hour': {
        text = `Una hora para el partido`;
        notificationDate = new Date(this.matchTime - 3600000);
        anticipation = 'hour';
        break;
      }
      case 'day': {
        text = `Un día para el partido`;
        notificationDate = new Date(this.matchTime - 3600000 * 24);
        anticipation = 'day';
        break;
      }
    }
    this.localNotifications.schedule({
      id: this.idPartido,
      title: 'Alerta de partido',
      text: `${text} ${this.equipo1} VS ${this.equipo2}`,
      trigger: {at: notificationDate},
      data: {anticipation, categoria: this.idCategoria},
    });
    this.isScheduled = true;
    await this.dismissPopover();
  }
  getDateTime(date: string, time: string): number {
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)).getTime();
  }
  async getAnticipationMessage(): Promise<string> {
    const notification = await this.localNotifications.get(this.idPartido);
    const notifAnticipation = JSON.parse(notification.data).anticipation;
    switch (notifAnticipation) {
      case 'none': {
        return 'el comienzo';
      }
      case 'hour': {
        return 'una hora antes';
      }
      case 'day': {
        return 'un día antes';
      }
    }
  }
}
