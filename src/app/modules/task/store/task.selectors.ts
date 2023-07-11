import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './reducers';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTaskList = createSelector(
  selectTaskState,
  (state: TaskState) => state.list
);

export const selectTaskDetail = createSelector(
  selectTaskState,
  (state: TaskState) => state.detail
);
