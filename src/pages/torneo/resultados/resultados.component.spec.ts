import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultadosComponent } from './resultados.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of} from 'rxjs';
import {TorneoService} from '../../../services/torneo/torneo.service';

describe('ResultadosComponent', () => {
  let component: ResultadosComponent;
  let fixture: ComponentFixture<ResultadosComponent>;
  let torneoServiceStub: Partial<TorneoService>;

  beforeEach(async(() => {
    torneoServiceStub = {
      getTorneo(idTorneo, jornada): Observable<any> {
        const torneo = {resultados: [
            {rdo1: '2-3', rdo2: '2,3'},
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
