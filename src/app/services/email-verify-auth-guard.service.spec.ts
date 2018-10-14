import { TestBed, inject } from '@angular/core/testing';

import { EmailVerifyAuthGuardService } from './email-verify-auth-guard.service';

describe('EmailVerifyAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailVerifyAuthGuardService]
    });
  });

  it('should be created', inject([EmailVerifyAuthGuardService], (service: EmailVerifyAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
