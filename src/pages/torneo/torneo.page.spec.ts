import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TorneoPage } from './torneo.page';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('TorneoPage', () => {
  let component: TorneoPage;
  let fixture: ComponentFixture<TorneoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorneoPage ],
      imports: [IonicModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(TorneoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
