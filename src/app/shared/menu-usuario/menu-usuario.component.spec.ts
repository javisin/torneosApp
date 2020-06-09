import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuUsuarioComponent } from './menu-usuario.component';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../services/user/user.service';
import { Storage } from '@ionic/storage';

describe('MenuUsuarioComponent', () => {
  let component: MenuUsuarioComponent;
  let fixture: ComponentFixture<MenuUsuarioComponent>;
  let userServiceStub: Partial<UserService>;
  let storageIonicMock: Partial<Storage>;

  beforeEach(async(() => {
    userServiceStub = {
      setStorageUser() {
      }
    };
    storageIonicMock = {
      get: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
      set: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
    };
    TestBed.configureTestingModule({
      declarations: [ MenuUsuarioComponent ],
      imports: [IonicModule,
      RouterTestingModule],
      providers: [
        {provide: UserService, useValue: userServiceStub},
        {provide: Storage, useValue: storageIonicMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
