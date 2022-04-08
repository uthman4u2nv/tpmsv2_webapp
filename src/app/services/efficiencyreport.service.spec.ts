import { TestBed } from '@angular/core/testing';

import { EfficiencyreportService } from './efficiencyreport.service';

describe('EfficiencyreportService', () => {
  let service: EfficiencyreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EfficiencyreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
