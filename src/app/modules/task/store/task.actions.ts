import { createAction, props } from '@ngrx/store';
import { ITask } from 'src/app/models/task';

export const fetchTasks = createAction('[Task] Fetch Tasks');
export const fetchTasksSuccess = createAction(
  '[Task] Fetch Tasks Success',
  props<{ tasks: ITask[] }>()
);
export const fetchTaskById = createAction(
  '[Task] Fetch Task by ID',
  props<{ id: string }>()
);
export const fetchTaskByIdSuccess = createAction(
  '[Task] Fetch Task by ID Success',
  props<{ task: ITask }>()
);
