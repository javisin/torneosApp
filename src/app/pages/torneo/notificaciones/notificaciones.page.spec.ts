import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificacionesPage } from './notificaciones.page';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {NotificacionService} from '../../../services/notificacion/notificacion.service'

describe('NotificacionesPage', () => {
  let component: NotificacionesPage;
  let fixture: ComponentFixture<NotificacionesPage>;
  let storageIonicMock: Partial<Storage>;
  let notificacionServiceStub: Partial<NotificacionService>;

  notificacionServiceStub = {
    getNotificaciones(): BehaviorSubject<any> {
      const notificacion = {
        titulo: 'Prueba',
        descripcion: 'test'
      };
      return new BehaviorSubject<any>(notificacion);
    }
  };

  beforeEach((() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
      set: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
    };
    TestBed.configureTestingModule({
      declarations: [ NotificacionesPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        {provide: NotificacionService, useValue: notificacionServiceStub},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
