import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNotificacionComponent } from './add-notificacion.component';
import {of} from 'rxjs';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

describe('AddNotificationComponent', () => {
  let component: AddNotificacionComponent;
  let fixture: ComponentFixture<AddNotificacionComponent>;
  let localNotificationSpy;
  localNotificationSpy = jasmine.createSpyObj('LocalNotification', {
    requestPermission: Promise.resolve(),
    on: of(true),
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNotificacionComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: LocalNotifications, useValue: localNotificationSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
