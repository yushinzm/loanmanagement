import { TestBed } from '@angular/core/testing';

import { IsNotNewGuard } from './is-not-new.guard';

describe('IsNotNewGuard', () => {
  let guard: IsNotNewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNotNewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
