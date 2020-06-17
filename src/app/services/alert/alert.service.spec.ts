import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Storage} from '@ionic/storage';
import {RouterTestingModule} from '@angular/router/testing';

describe('AlertService', () => {
  let storageIonicMock: Partial<Storage>;

  beforeEach(() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
      set: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: Storage, useValue: storageIonicMock},
      ]
    });
  });

  it('should be created', () => {
    const service: AlertService = TestBed.get(AlertService);
    expect(service).toBeTruthy();
  });
});
