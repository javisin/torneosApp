import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TorneosPage } from './torneos.page';
import {TorneosPageRoutingModule} from './torneos-routing.module';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {UserService} from '../../services/user/user.service';
import {TorneoService} from '../../services/torneo/torneo.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {User} from '../../services/user/user';
import {Storage} from '@ionic/storage';
import {RouterTestingModule} from '@angular/router/testing';

describe('TorneosPage', () => {
  let component: TorneosPage;
  let fixture: ComponentFixture<TorneosPage>;
  let userServiceStub: Partial<UserService>;
  let torneoServiceStub: Partial<TorneoService>;
  let storageIonicMock: Partial<Storage>;

  beforeEach(async(() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
      set: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
    };
    userServiceStub = {
      getUser(): BehaviorSubject<User> {
        return new BehaviorSubject(
          {
            login: 'ok',
            nombre: 'javi',
            ape: 'tu padre',
            nick: 'javisin',
            token: '123',
            email: 'demoapp4'
          }
        );
      }
    };
    torneoServiceStub = {
      getTorneos(): Observable<any> {
        const torneos = {
          torneos:
            [
              {
                nombreTorneo: 'alfonso',
                idTorneo: '23442'
              },
              {
                nombreTorneo: 'alfossnso',
                idTorneo: '234342'
              },
            ]
        };
        return of(torneos);
      }
    };
    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        TorneosPageRoutingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: UserService, useValue: userServiceStub},
        {provide: TorneoService, useValue: torneoServiceStub},
        {provide: Storage, useValue: storageIonicMock},
      ],
      declarations: [TorneosPage],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(TorneosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
