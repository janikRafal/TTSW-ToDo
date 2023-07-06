import { TestBed } from '@angular/core/testing';

import { TaskGuard } from './task-guard.service';

describe('TaskGuardService', () => {
  let service: TaskGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
