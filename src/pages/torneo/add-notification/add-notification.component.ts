import {Component, Input, OnInit} from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {PopoverController} from '@ionic/angular';

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
  constructor(private localNotifications: LocalNotifications,
              private popoverController: PopoverController,
              ) { }

  async ngOnInit() {
  }
  async dismissModal() {
   await this.popoverController.dismiss({
      dismissed: true
    });
  }
  async createNotification() {
    this.localNotifications.schedule({
      title: 'Comienzo del partido',
      text: 'Pruebita a ve',
      trigger: { at: new Date(2020, 4, 9, 21, 52) }
    });
  }
}
