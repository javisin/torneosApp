import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddResultadoComponent } from './add-resultado.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Storage} from '@ionic/storage';

describe('AddResultadoComponent', () => {
  let component: AddResultadoComponent;
  let fixture: ComponentFixture<AddResultadoComponent>;
  let storageIonicMock: Partial<Storage>;

  beforeEach((() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
      set: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
    };
    TestBed.configureTestingModule({
      declarations: [ AddResultadoComponent ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule],
      providers: [
        {provide: Storage, useValue: storageIonicMock},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
