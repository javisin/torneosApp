import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Storage} from '@ionic/storage';

describe('AuthGuard', () => {
  let storageIonicMock: Partial<Storage>;
  beforeEach(() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
      set: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard,
        {provide: Storage, useValue: storageIonicMock}
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
