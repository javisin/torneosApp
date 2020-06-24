import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NickInfoComponent } from './nick-info.component';

describe('NickInfoComponent', () => {
  let component: NickInfoComponent;
  let fixture: ComponentFixture<NickInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NickInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NickInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
