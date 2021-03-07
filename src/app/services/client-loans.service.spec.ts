import { TestBed } from '@angular/core/testing';

import { ClientLoansService } from './client-loans.service';

describe('ClientLoansService', () => {
  let service: ClientLoansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLoansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
