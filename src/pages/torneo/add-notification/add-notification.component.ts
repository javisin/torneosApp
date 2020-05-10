import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {IonSegment, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss'],
})
export class AddNotificationComponent implements OnInit {
  @Input() idPartido: number;
  @Input() equipo1: string;
  @Input() resultado1: string;
  @Input() equipo2: string;
  @Input() resultado2: string;
  @ViewChild(IonSegment, {static: false}) segment: IonSegment;
  public anticipationMessage: string;
  constructor(private localNotifications: LocalNotifications,
              private popoverController: PopoverController
              ) { }

  async ngOnInit() {
    if (await this.localNotifications.isScheduled(this.idPartido)) {
      const notification = await this.localNotifications.get(this.idPartido);
      const notifAnticipation = JSON.parse(notification.data).anticipation;
      switch (notifAnticipation) {
        case 'none': {
          this.anticipationMessage = 'el comienzo';
          break;
        }
        case 'hour': {
          this.anticipationMessage = 'una hora antes';
          break;
        }
        case 'day': {
          this.anticipationMessage = 'un día antes';
          break;
        }
      }
    }
  }
  async dismissModal() {
   await this.popoverController.dismiss({
      dismissed: true
    });
  }
  async cancelNotification() {
    await this.localNotifications.cancel(this.idPartido);
    await this.dismissModal();
  }
  async createNotification() {
    const value = this.segment.value;
    const matchTime = Date.now();
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
      data: {anticipation}
    });
    await this.dismissModal();
  }
}
