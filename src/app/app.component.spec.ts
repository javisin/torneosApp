import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import {UserService} from './services/user/user.service';
import {BehaviorSubject, of} from 'rxjs';
import {User} from './services/user/user';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy, localNotificationSpy;
  let userServiceStub: Partial<UserService>;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
    localNotificationSpy = jasmine.createSpyObj('LocalNotification', {
      requestPermission: Promise.resolve(),
      on: of(true),
    });
    userServiceStub = {
      getUser(): BehaviorSubject<User> {
        const user = {
          nombre: 'javi',
          ape: 'canario',
          nick: 'javisin',
          token: '123',
          email: 'javitorneos@gmail.com'
        };
        return new BehaviorSubject<User>(user);
      }
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        IonicStorageModule.forRoot()
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ScreenOrientation,
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: UserService, useValue: userServiceStub },
        { provide: LocalNotifications, useValue: localNotificationSpy },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  // TODO: add more tests!

});
