import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultadosEquipoComponent } from './resultados-equipo.component';

describe('MisResultadosComponent', () => {
  let component: ResultadosEquipoComponent;
  let fixture: ComponentFixture<ResultadosEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosEquipoComponent ],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
