import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { IDictionary } from 'src/app/models/dictionary';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { getTasks, removeTaskById } from '../../store/task.actions';
import { selectTaskList, selectTaskStatus } from '../../store/task.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  dictionaryList$!: Observable<IDictionary[]>;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(getTasks());

    this.dictionaryList$ = this.store.pipe(
      select(selectTaskList),
      map(
        (tasks) =>
          tasks?.map((task) => ({
            id: task._id || '',
            label: task.title || '',
          })) || []
      )
    );

    this.taskService.setHeader('List of all tasks');
  }

  getTaskStatus(taskId: string) {
    return this.store.pipe(select(selectTaskStatus(taskId)));
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
      this.store.dispatch(removeTaskById({ taskId }));
    } else {
      return;
    }
  }
}
