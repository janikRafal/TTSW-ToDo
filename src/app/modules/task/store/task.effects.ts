import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { ITask } from 'src/app/models/task';
import { environment } from 'src/environments/environment';
import { EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskEffects {
  apiUrl = `https://crudcrud.com/api/${environment.api_key}/todo`;

  fetchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.fetchTasks),
      mergeMap(() =>
        this.http.get<ITask[]>(this.apiUrl).pipe(
          map((tasks) => TaskActions.fetchTasksSuccess({ tasks })),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  fetchTaskById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.fetchTaskById),
      mergeMap((action) =>
        this.http.get<ITask>(`${this.apiUrl}/${action.id}`).pipe(
          map((task) => TaskActions.fetchTaskByIdSuccess({ task })),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
