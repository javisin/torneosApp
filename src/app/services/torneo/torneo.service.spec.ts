import { TestBed } from '@angular/core/testing';

import { TorneoService } from './torneo.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Storage} from '@ionic/storage';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('TorneoService', () => {
  let storageIonicMock: Partial<Storage>;

  storageIonicMock = {
    get: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
    set: () => new Promise<any>((resolve) => resolve('As2342fAfgsdr')),
  };
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {provide: Storage, useValue: storageIonicMock},
    ]
  }));

  it('should be created', () => {
    const service: TorneoService = TestBed.get(TorneoService);
    expect(service).toBeTruthy();
  });
});
