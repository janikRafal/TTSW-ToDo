import { createAction, props } from '@ngrx/store';
import { ITask } from 'src/app/models/task';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: ITask[] }>()
);
