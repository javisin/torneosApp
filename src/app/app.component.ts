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
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // await this.screenOrientation.lock('portrait');
      const platform = this.getPlatform();
      this.userService.setPlatform(platform);
      const SO = this.getSO();
      this.userService.setSO(SO);
      this.storage.get('user').then(user => this.userService.updateUser(user));
      this.userService.getUser().subscribe(user => this.userName = user ? user.nombre : null);

      // reestructurar

      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
    //   PushNotifications.requestPermission().then( result => {
    //     if (result.granted) {
    //       // Register with Apple / Google to receive push via APNS/FCM
    //       PushNotifications.register();
    //     } else {
    //       // Show some error
    //     }
    //   });
    //
    //   // On success, we should be able to receive notifications
    //   PushNotifications.addListener('registration',
    //     (token: PushNotificationToken) => {
    //       this.userService.setPushToken(token.value);
    //     }
    //   );
    //
    //   // Some issue with our setup and push will not work
    //   PushNotifications.addListener('registrationError',
    //     (error: any) => {
    //       alert('Error on registration: ' + JSON.stringify(error));
    //     }
    //   );
    //
    //   // Show us the notification payload if the app is open on our device
    //   PushNotifications.addListener('pushNotificationReceived',
    //     (notification: PushNotification) => {
    //       alert('Push received: ' + JSON.stringify(notification));
    //     }
    //   );
    //
    //   // Method called when tapping on a notification
    //   PushNotifications.addListener('pushNotificationActionPerformed',
    //     (notification: PushNotificationActionPerformed) => {
    //       alert('Push action performed: ' + JSON.stringify(notification));
    //     }
    //   );
    });
  }
  getPlatform(): string {
    if (this.platform.is('tablet')) {
      return 'tablet';
    } else {
      return 'mobile';
    }
  }
  getSO(): string {
    if (this.platform.is('ios')) {
      return 'ios';
    } else {
      return 'android';
    }
  }
}
