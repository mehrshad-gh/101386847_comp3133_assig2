import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validationGuardGuard } from './validation-guard.guard';

describe('validationGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validationGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
