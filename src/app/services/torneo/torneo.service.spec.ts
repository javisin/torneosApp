import { TestBed } from '@angular/core/testing';

import { TorneoService } from './torneo.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TorneoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: TorneoService = TestBed.get(TorneoService);
    expect(service).toBeTruthy();
  });
});
