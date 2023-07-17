import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { ITask } from 'src/app/models/task';
import * as taskActions from '../task.actions';

export const taskFeatureKey = 'tasks';

export interface TaskState {
  list: ITask[] | undefined;
  detail: ITask | undefined;
}

export const initialTaskState: TaskState = {
  list: undefined,
  detail: undefined,
};

export const taskReducer = createReducer(
  initialTaskState,

  on(taskActions.getTasksSuccess, (state, { tasks: list }) => {
    return { ...state, list };
  }),

  on(taskActions.getTaskByIdSuccess, (state, { task: detail }) => {
    return { ...state, detail };
  }),

  on(taskActions.addNewTaskSuccess, (state) => {
    return { ...state };
  })
);

// export const reducers: ActionReducerMap<TaskState> = {};

// export const metaReducers: MetaReducer<TaskState>[] = isDevMode() ? [] : [];
