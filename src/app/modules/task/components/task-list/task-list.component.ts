import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { IDictionary } from 'src/app/models/dictionary';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  dictionaryList!: IDictionary[];
  private destroy$ = new Subject<void>();

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.taskService
      .getDictionaries()
      .pipe(
        takeUntil(this.destroy$),
        tap((dictionaryList) => {
          this.dictionaryList = dictionaryList;
        })
      )
      .subscribe();

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
      this.taskService.removeTaskById(taskId).subscribe();
    } else {
      return;
    }
  }
}
