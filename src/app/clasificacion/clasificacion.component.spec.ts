import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClasificacionComponent } from './clasificacion.component';

describe('ClasificacionComponent', () => {
  let component: ClasificacionComponent;
  let fixture: ComponentFixture<ClasificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
