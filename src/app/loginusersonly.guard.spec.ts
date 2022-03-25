import { TestBed } from '@angular/core/testing';

import { LoginusersonlyGuard } from './loginusersonly.guard';

describe('LoginusersonlyGuard', () => {
  let guard: LoginusersonlyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginusersonlyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
