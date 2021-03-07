import { TestBed } from '@angular/core/testing';

import { ClientsLoansService } from './clients-loans.service';

describe('ClientsLoansService', () => {
  let service: ClientsLoansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsLoansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
