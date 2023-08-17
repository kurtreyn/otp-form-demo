import { TestBed } from '@angular/core/testing';

import { MultistepFormService } from './multistep-form.service';

describe('MultistepFormService', () => {
  let service: MultistepFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultistepFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
