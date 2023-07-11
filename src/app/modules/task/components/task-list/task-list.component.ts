import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { IDictionary } from 'src/app/models/dictionary';

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
        tap((dictionaryList) => {
          this.dictionaryList = dictionaryList;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.taskService.setHeader('List of all tasks');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTaskStatus(id: string) {
    return this.taskService.getTaskStatusById(id);
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
      this.taskService
        .removeTaskById(taskId)
        .pipe(
          switchMap(() => this.taskService.getDictionaries()),
          tap((dictionaries) => {
            this.dictionaryList = dictionaries;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    } else {
      return;
    }
  }
}
