import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultadosEquipoComponent } from './resultados-equipo.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ResultadosEquipoComponent', () => {
  let component: ResultadosEquipoComponent;
  let fixture: ComponentFixture<ResultadosEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosEquipoComponent ],
      imports: [IonicModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
