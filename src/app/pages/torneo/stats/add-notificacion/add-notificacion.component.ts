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
  @Input() idCategoria: string;
  @ViewChild(IonSegment) segment: IonSegment;
  public isScheduled: boolean;
  public anticipationMessage: string;
  public finished: boolean;
  constructor(private localNotifications: LocalNotifications,
              private popoverController: PopoverController
              ) {
    this.finished = false;
    this.isScheduled = false;
  }
  async ngOnInit(): Promise<void> {
    if (this.fecha !== '') {
      if (Date.now() > this.getDateTime(this.fecha)) {
        this.finished = true;
      } else {
        if (await this.localNotifications.isScheduled(this.idPartido)) {
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
    await this.dismissPopover();
  }
  async createNotification(): Promise<void>  {
    const value = this.segment.value;
    const matchTime = this.getDateTime(this.fecha);
    let text: string;
    let anticipation: string;
    let notificationDate: Date;
    switch (value) {
      case 'none': {
        text = `Comienzo del partido`;
        notificationDate = new Date(matchTime);
        anticipation = 'none';
        break;
      }
      case 'hour': {
        text = `Una hora para el partido`;
        notificationDate = new Date(matchTime - 3600000);
        anticipation = 'hour';
        break;
      }
      case 'day': {
        text = `Un día para el partido`;
        notificationDate = new Date(matchTime - 3600000 * 24);
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
  getDateTime(stringDate: string): number {
    const [year, month, day] = stringDate.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
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
