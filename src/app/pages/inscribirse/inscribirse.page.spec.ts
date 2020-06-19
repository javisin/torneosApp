import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InscribirsePage } from './inscribirse.page';

describe('InscribirsePage', () => {
  let component: InscribirsePage;
  let fixture: ComponentFixture<InscribirsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscribirsePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InscribirsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
