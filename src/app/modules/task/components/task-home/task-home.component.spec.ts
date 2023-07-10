import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHomeComponent } from './task-home.component';

describe('TaskHomeComponent', () => {
  let component: TaskHomeComponent;
  let fixture: ComponentFixture<TaskHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskHomeComponent]
    });
    fixture = TestBed.createComponent(TaskHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});