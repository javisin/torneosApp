import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';
import {UserService} from '../services/user/user.service';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Router} from '@angular/router';
const { PushNotifications } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userName: string;
  token: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private storage: Storage,
    private screenOrientation: ScreenOrientation,
    private localNotifications: LocalNotifications,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setUpLocalNotifications();
      this.setUpPushNotifications();
      const SO = this.getSO();
      this.userService.setSO(SO);
      this.userService.setStorageUser();
      this.userService.getUser().subscribe(user => this.userName = user ? user.nombre : null);
      await this.screenOrientation.lock('portrait');
    });
  }
  setUpLocalNotifications() {
    this.localNotifications.requestPermission().then(() => {
      this.localNotifications.on('click').subscribe(async notification => {
        await this.router.navigate(['/torneos/torneo/', notification.data.categoria]);
      });
    });
  }
  setUpPushNotifications() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        this.userService.setPushToken(token.value);
      }
    );
    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Notification: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        this.router.navigate([`torneos/torneo/${notification.notification.data.idTorneo}/notifications`]);
      }
    );
  }
  getSO(): string {
    if (this.platform.is('ios')) {
      return 'ios';
    } else {
      return 'android';
    }
  }
}
