import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './reducers';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTaskList = createSelector(
  selectTaskState,
  (state: TaskState) => state.list
);

export const selectTaskFromStore = (taskId: string) =>
  createSelector(selectTaskState, (state: TaskState) =>
    state.list?.find((task) => task._id === taskId)
  );

export const selectTaskDetail = createSelector(
  selectTaskState,
  (state: TaskState) => state.detail
);

export const selectTaskStatus = (taskId: string) =>
  createSelector(selectTaskState, (state: TaskState) => {
    const task = state.list?.find((task) => task._id === taskId);
    return task ? task.status : false;
  });
