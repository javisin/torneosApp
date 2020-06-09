import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TorneoPage } from './torneo.page';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, of} from 'rxjs';
import {UserService} from '../../services/user/user.service';
import {User} from '../../services/user/user';

describe('TorneoPage', () => {
  let component: TorneoPage;
  let fixture: ComponentFixture<TorneoPage>;
  let userServiceStub: Partial<UserService>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorneoPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({id: 123})}},
        {provide: UserService, useValue: userServiceStub}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TorneoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
