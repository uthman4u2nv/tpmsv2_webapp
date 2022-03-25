import { TestBed } from '@angular/core/testing';

import { SwitcherrorsService } from './switcherrors.service';

describe('SwitcherrorsService', () => {
  let service: SwitcherrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitcherrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
