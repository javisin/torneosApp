import { TestBed } from '@angular/core/testing';

import { RefreshService } from './refresh.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RefreshService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RefreshService = TestBed.get(RefreshService);
    expect(service).toBeTruthy();
  });
});
