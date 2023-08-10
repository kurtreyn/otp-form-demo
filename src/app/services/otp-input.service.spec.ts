import { TestBed } from '@angular/core/testing';

import { OtpInputService } from './otp-input.service';

describe('OtpInputService', () => {
  let service: OtpInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
