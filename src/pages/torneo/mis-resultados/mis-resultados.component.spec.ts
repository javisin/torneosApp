import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisResultadosComponent } from './mis-resultados.component';

describe('MisResultadosComponent', () => {
  let component: MisResultadosComponent;
  let fixture: ComponentFixture<MisResultadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisResultadosComponent ],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MisResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
