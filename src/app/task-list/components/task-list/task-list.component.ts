import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks!: Task[];
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskService
      .getAllTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => (this.tasks = tasks));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTaskDetail(taskId: string) {
    this.router.navigate([`/task/${taskId}`]);
  }

  onAddButtonClick() {
    this.router.navigate(['/add-task']);
  }

  onTaskDelete(taskId: string, taskTitle: string): void {
    const text = `Confirm that you REALLY want to remove this task:\n\n"${taskTitle}"`;

    if (confirm(text) === true) {
      this.taskService.removeTaskById(taskId);
    } else {
      return;
    }
  }
}
