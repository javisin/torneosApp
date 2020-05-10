import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {IonSegment, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss'],
})
export class AddNotificationComponent implements OnInit {
  @Input() equipo1: string;
  @Input() result1: string;
  @Input() equipo2: string;
  @Input() result2: string;
  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  constructor(private localNotifications: LocalNotifications,
              private popoverController: PopoverController,
              ) { }

  ngOnInit() {
  }
  async dismissModal() {
   await this.popoverController.dismiss({
      dismissed: true
    });
  }
  async createNotification() {
    const value = this.segment.value;
    const matchTime = Date.now();
    let text: string;
    let notificationDate: Date;
    switch (value) {
      case 'none': {
        text = `Comienzo del partido ${this.equipo1} VS ${this.equipo2}`;
        notificationDate = new Date(matchTime);
        break;
      }
      case 'hour': {
        text = `Una hora para el partido ${this.equipo1} VS ${this.equipo2}`;
        notificationDate = new Date(matchTime - 3600000);
        break;
      }
      case 'day': {
        text = `Un día al partido ${this.equipo1} VS ${this.equipo2}`;
        notificationDate = new Date(matchTime - 3600000 * 24);
        break;
      }
    }
    this.localNotifications.schedule({
      title: 'Comienzo del partido',
      text,
      trigger: {at: notificationDate},
    });
    await this.dismissModal();
  }
}
