import { TestBed } from '@angular/core/testing';

import { IsNewGuard } from './is-new.guard';

describe('IsNewGuard', () => {
  let guard: IsNewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
