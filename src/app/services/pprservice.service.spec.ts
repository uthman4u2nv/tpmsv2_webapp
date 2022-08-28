import { TestBed } from '@angular/core/testing';

import { PprserviceService } from './pprservice.service';

describe('PprserviceService', () => {
  let service: PprserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PprserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
