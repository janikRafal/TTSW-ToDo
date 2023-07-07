import { TestBed } from '@angular/core/testing';

import { TaskGuardService } from './task-guard.service';

describe('TaskGuardService', () => {
  let service: TaskGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
