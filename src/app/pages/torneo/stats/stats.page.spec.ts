import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatsPage } from './stats.page';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TorneoService} from '../../../services/torneo/torneo.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../../services/user/user';
import {UserService} from '../../../services/user/user.service';
import {ErrorService} from '../../../services/error/error.service';

describe('StatsPage', () => {
  let component: StatsPage;
  let fixture: ComponentFixture<StatsPage>;
  let torneoServiceStub: Partial<TorneoService>;
  let userServiceStub: Partial<UserService>;
  let errorServiceStub: Partial<ErrorService>;

  torneoServiceStub = {
    getCategoria(): BehaviorSubject<any> {
      return new BehaviorSubject(
        {
          modalidad: 'sets',
          idEquipo: 12
        }
      );
    }
  };
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
  errorServiceStub = {
    async createErrorAlert(): Promise<HTMLIonAlertElement> {
      return new HTMLIonAlertElement();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsPage ],
      imports: [IonicModule],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {provide: UserService, useValue: userServiceStub},
        {provide: TorneoService, useValue: torneoServiceStub},
        {provide: ErrorService, useValue: errorServiceStub},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
