import { TestBed } from '@angular/core/testing';

import { ColorcodeService } from './colorcode.service';

describe('ColorcodeService', () => {
  let service: ColorcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
