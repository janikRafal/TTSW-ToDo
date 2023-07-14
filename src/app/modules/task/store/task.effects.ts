import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { TaskService } from '../task.service';
import * as TaskActions from './task.actions';
import { ITask } from 'src/app/models/task';
import { environment } from 'src/environments/environment';
import { EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskEffects {
  apiUrl = `https://crudcrud.com/api/${environment.api_key}/todo`;

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      tap(() => console.log('loadTasks action dispatched')), // Dodaj console.log tutaj
      mergeMap(() =>
        this.http.get<ITask[]>(this.apiUrl).pipe(
          tap((tasks) => console.log('Received tasks from API:', tasks)), // Dodaj console.log tutaj
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) => {
            console.error('Error occurred when fetching tasks:', error); // Dodaj console.error tutaj
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
