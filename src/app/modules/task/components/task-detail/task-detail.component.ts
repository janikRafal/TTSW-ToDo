import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, first, filter } from 'rxjs/operators';
import { TaskService } from '../../task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import {
  getTaskById,
  editTaskById,
  getTaskByIdSuccess,
} from '../../store/task.actions';
import {
  selectTaskDetail,
  selectTaskFromStore,
} from '../../store/task.selectors';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  task$!: Observable<ITask>;
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id')!;

    this.store
      .pipe(
        select(selectTaskFromStore(taskId)),
        takeUntil(this.destroy$),
        map((task) =>
          task
            ? this.store.dispatch(getTaskByIdSuccess({ task }))
            : this.store.dispatch(getTaskById({ taskId }))
        )
      )
      .subscribe();

    this.task$ = this.store
      .select(selectTaskDetail)
      .pipe(filter((task) => !!task)) as Observable<ITask>;

    this.taskService.setHeader('Task edit');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChangeStatus() {
    this.task$.pipe(first(), takeUntil(this.destroy$)).subscribe((task) => {
      if (task) {
        const taskWithToggledStatus = { ...task, status: !task.status };

        this.store.dispatch(editTaskById({ task: taskWithToggledStatus }));
        // this.store.dispatch(
        //   getTaskByIdSuccess({ task: taskWithToggledStatus })
        // );
      }
    });
  }

  onGoBack() {
    this.router.navigate(['todo/task-list']);
  }
}
