import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TorneosPage } from './torneos.page';
import {TorneosPageRoutingModule} from './torneos-routing.module';
import {Observable, of} from 'rxjs';
import {UserService} from '../../services/user/user.service';
import {TorneoService} from '../../services/torneo/torneo.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {User} from '../../services/user/user';

describe('TorneosPage', () => {
  let component: TorneosPage;
  let fixture: ComponentFixture<TorneosPage>;
  let userServiceStub: Partial<UserService>;
  let torneoServiceStub: Partial<TorneoService>;

  beforeEach(async(() => {
    userServiceStub = {
      getUser(): Observable<User> {
        const user = {
          login: 'ok',
          nombre: 'javi',
          ape: 'tu padre',
          nick: 'javisin',
          token: '123',
        };
        return of(user);
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
      ],
      providers: [
        {provide: UserService, useValue: userServiceStub},
        {provide: TorneoService, useValue: torneoServiceStub},
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
