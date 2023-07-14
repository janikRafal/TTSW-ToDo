import { createReducer, on } from '@ngrx/store';
import { fetchTasksSuccess, fetchTaskByIdSuccess } from './task.actions';
import { ITask } from 'src/app/models/task';

export interface TaskState {
  tasks: ITask[];
  task: ITask | null;
}

export const initialState: TaskState = {
  tasks: [],
  task: null,
};

export const taskReducer = createReducer(
  initialState,
  on(fetchTasksSuccess, (state, { tasks }) => {
    return { ...state, tasks };
  }),
  on(fetchTaskByIdSuccess, (state, { task }) => {
    return { ...state, task };
  })
);
