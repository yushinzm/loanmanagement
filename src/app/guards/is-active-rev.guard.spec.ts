import { TestBed } from '@angular/core/testing';

import { IsActiveRevGuard } from './is-active-rev.guard';

describe('IsActiveRevGuard', () => {
  let guard: IsActiveRevGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsActiveRevGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
