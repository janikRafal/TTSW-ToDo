import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { ITask } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks!: ITask[];
  private destroy$ = new Subject<void>();

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.taskService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => (this.tasks = tasks));

    this.taskService.setHeader('List of all tasks');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTaskDetail(taskId: string) {
    this.router.navigate([`todo/task/${taskId}`]);
  }

  onAddButtonClick() {
    this.router.navigate(['todo/add-task']);
  }

  onTaskDelete(taskId: string, taskTitle: string): void {
    const confirmText = `Confirm that you REALLY want to remove this task:\n\n"${taskTitle}"`;

    if (confirm(confirmText) === true) {
      this.taskService.removeTaskById(taskId);
    } else {
      return;
    }
  }
}
