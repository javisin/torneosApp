import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';
import {UserService} from './services/user/user.service';
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
    private toastController: ToastController,
    private screenOrientation: ScreenOrientation,
    private localNotifications: LocalNotifications,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp(): void {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setUpLocalNotifications();
      this.setUpPushNotifications();
      const SO = this.getSO();
      this.userService.setSO(SO);
      this.userService.setStorageUser();
      this.userService.getUser().subscribe(user => this.userName = user ? user.nick : null);
      await this.screenOrientation.lock('portrait');
    });
  }
  setUpLocalNotifications(): void {
    this.localNotifications.requestPermission().then(() => {
      this.localNotifications.on('click').subscribe(async notification => {
        await this.router.navigate(['/torneo/', notification.data.categoria]);
      });
    });
  }
  setUpPushNotifications(): void {
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        this.userService.setPushToken(token.value);
      }
    );
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );
    PushNotifications.addListener('pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('woopi')
        const toast = await this.toastController.create({
          message: `${notification.title}: ${notification.body}`,
          duration: 2000,
          position: 'top'
        });
        await toast.present();
      }
    );
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        this.router.navigate([`/torneo/${notification.notification.data.idTorneo}/notifications`]);
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
