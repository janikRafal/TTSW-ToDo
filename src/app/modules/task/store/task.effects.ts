import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as taskActions from './task.actions';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Injectable()
export class TaskEffects {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.getTasks),
      mergeMap(() =>
        this.taskService.fetchTasks().pipe(
          map((tasks) => taskActions.getTasksSuccess({ tasks })),
          catchError((error) => of(taskActions.getTasksFailure({ error })))
        )
      )
    )
  );

  getTaskById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.getTaskById),
      mergeMap((action) =>
        this.taskService.fetchTaskById(action.taskId).pipe(
          map((task) => taskActions.getTaskByIdSuccess({ task })),
          catchError((error) => of(taskActions.getTaskByIdFailure({ error })))
        )
      )
    )
  );

  addNewTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.addNewTask),
      mergeMap((action) =>
        this.taskService.addNewTask(action.task).pipe(
          map(() => taskActions.addNewTaskSuccess()),
          catchError((error) => of(taskActions.addNewTaskFailure({ error }))),
          tap(() => this.router.navigateByUrl('/todo/task-list'))
        )
      )
    )
  );

  editTaskById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.editTaskById),
      mergeMap((action) =>
        this.taskService.editTaskById(action.task).pipe(
          map(() => {
            this.router.navigate([`todo/task/${action.task._id}`]);
            return taskActions.editTaskByIdSuccess({ task: action.task });
          }),
          catchError((error) => of(taskActions.editTaskByIdFailure({ error })))
        )
      )
    )
  );

  removeTaskById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.removeTaskById),
      mergeMap((action) =>
        this.taskService.removeTaskById(action.taskId).pipe(
          map(() =>
            taskActions.removeTaskByIdSuccess({ taskId: action.taskId })
          ),
          catchError((error) =>
            of(taskActions.removeTaskByIdFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private router: Router
  ) {}
}
