import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatsPage } from './stats.page';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('TorneoPage', () => {
  let component: StatsPage;
  let fixture: ComponentFixture<StatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsPage ],
      imports: [IonicModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
