import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userName: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notification: LocalNotifications,
    private router: Router
  ) {
    this.initializeApp();
    router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      this.userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).nombre : null;
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notification.requestPermission().then(() => {
        this.notification.schedule({
          id: 1,
          text: 'Single Hola',
          foreground: true
        });
        }
      );
      // @ts-ignore
      this.notification.schedule({
        title: 'Te amo aun mas bendacote',
        trigger: { every: 'minute', count: 5 }
      });
    });
  }
}
