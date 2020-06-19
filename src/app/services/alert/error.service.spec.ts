import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Storage} from '@ionic/storage';
import {RouterTestingModule} from '@angular/router/testing';

describe('ErrorService', () => {
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
    const service: ErrorService = TestBed.get(ErrorService);
    expect(service).toBeTruthy();
  });
});
