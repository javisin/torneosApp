import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClasificacionComponent } from './clasificacion.component';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TorneoService} from '../../../../services/torneo/torneo.service';

describe('ClasificacionComponent', () => {
  let component: ClasificacionComponent;
  let fixture: ComponentFixture<ClasificacionComponent>;
  let torneoServiceStub: Partial<TorneoService>;

  torneoServiceStub = {
    getClasificacion(): BehaviorSubject<any> {
      return new BehaviorSubject(
        {
          posiciones: ['1', '2']
        }
      );
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificacionComponent, HttpClientTestingModule ],
      imports: [IonicModule],
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({id: 123})}},
        {provide: TorneoService, useValue: torneoServiceStub},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
