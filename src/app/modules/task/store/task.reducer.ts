import { createReducer, on } from '@ngrx/store';
import { ITaskState } from 'src/app/models/taskState';
import * as TaskActions from './task.actions';
import { ITask } from 'src/app/models/task';

export const initialState: ITask[] = [];

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => {
    console.log('loadTasksSuccess action dispatched with tasks', tasks); // Dodaj console.log tutaj
    return [...tasks];
  })
);
