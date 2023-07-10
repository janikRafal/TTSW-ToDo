import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../task.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
})
export class TaskHomeComponent {
  @Input() pageHeader!: string;

  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.taskService.pageHeader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((header) => {
        this.pageHeader = header;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
