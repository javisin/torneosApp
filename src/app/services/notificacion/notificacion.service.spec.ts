import { TestBed } from '@angular/core/testing';

import { NotificacionService } from './notificacion.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NotificacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: NotificacionService = TestBed.get(NotificacionService);
    expect(service).toBeTruthy();
  });
});
