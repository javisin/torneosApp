import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogInPage } from './log-in.page';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Observable, of} from 'rxjs';
import {User} from '../../services/user/user';
import {RouterTestingModule} from '@angular/router/testing';
import {Storage} from '@ionic/storage';

describe('LogInPage', () => {
  let component: LogInPage;
  let fixture: ComponentFixture<LogInPage>;
  let userServiceStub: Partial<UserService>;
  let storageIonicMock: Partial<Storage>;

  beforeEach(async(() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
      set: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
    };
    userServiceStub = {
      logIn(): Observable<User> {
        const user = {
          login: 'ok',
          nombre: 'javi',
          ape: 'canario',
          nick: 'javisin',
          token: '123',
          email: 'javitorneos@gmail.com'
        };
        return of(user);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ LogInPage ],
      imports: [IonicModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: UserService, useValue: userServiceStub},
        {provide: Storage, useValue: storageIonicMock},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
