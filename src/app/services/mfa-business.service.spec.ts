import { TestBed } from '@angular/core/testing';

import { MfaBusinessService } from './mfa-business.service';

describe('MfaBusinessService', () => {
  let service: MfaBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfaBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
