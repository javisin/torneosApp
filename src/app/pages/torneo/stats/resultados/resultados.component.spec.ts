import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultadosComponent } from './resultados.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of} from 'rxjs';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {Jornada} from '../../../../services/torneo/jornada';

describe('ResultadosComponent', () => {
  let component: ResultadosComponent;
  let fixture: ComponentFixture<ResultadosComponent>;
  let torneoServiceStub: Partial<TorneoService>;

  beforeEach(async(() => {
    torneoServiceStub = {
      getResultados(): Observable<Jornada> {
        const torneo = {
          jornadaactiva: '1',
          totaljornadas: '3',
          modalidadvisual: 'sets',
          resultados: [{
            Idpartido: 12,
            idequipo1: '123',
            equipo1: 'Huracán',
            rdo1: '2',
            idequipo2: '122',
            equipo2: 'Acodetti',
            rdo2: '1',
            datospartido: 'Sin árbitro',
            fechapartido: '2020-05-29',
            horapartido: '15:35',
          },
          ]
        };
        return of(torneo);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ ResultadosComponent ],
      imports: [IonicModule, RouterTestingModule],
      providers: [
        {provide: TorneoService, useValue: torneoServiceStub}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
