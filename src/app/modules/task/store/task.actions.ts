import { createAction, props } from '@ngrx/store';
import { ITask } from 'src/app/models/task';
import { TaskState } from './reducers';

// ----- Get All Tasks ----- //

export const getTasks = createAction('[Task List] Get All Tasks');

export const getTasksSuccess = createAction(
  '[Task List] Get All Tasks - Success',
  props<{ tasks: ITask[] }>()
);

export const getTasksFailure = createAction(
  '[Task List] Get All Tasks - Failure',
  props<{ error: any }>()
);

// ----- Get Task By ID ----- //

export const getTaskById = createAction(
  '[Task Detail] Get Task By ID',
  props<{ taskId: string }>()
);

export const getTaskByIdSuccess = createAction(
  '[Task Detail] Get Task By ID - Success',
  props<{ task: ITask }>()
);

export const getTaskByIdFailure = createAction(
  '[Task Detail] Get Task By ID - Failure',
  props<{ error: any }>()
);

// ----- Add New Task ----- //

export const addNewTask = createAction(
  '[Task Form] Add New Task',
  props<{ task: ITask }>()
);

export const addNewTaskSuccess = createAction(
  '[Task Form] Add New Task - Success'
);

export const addNewTaskFailure = createAction(
  '[Task Form] Add New Task - Failure',
  props<{ error: any }>()
);

// ----- Add New Task ----- //

export const editTaskById = createAction(
  '[Task Detail / Task Edit] Edit Task By ID',
  props<{ task: ITask }>()
);

export const editTaskByIdSuccess = createAction(
  '[Task Detail / Task Edit] Edit Task By ID - Success',
  props<{ task: ITask }>()
);

export const editTaskByIdFailure = createAction(
  '[Task Detail / Task Edit] Edit Task By ID - Failure',
  props<{ error: any }>()
);

// ----- Remove Task By ID----- //

export const removeTaskById = createAction(
  '[Task List] Remove Task By ID',
  props<{ taskId: string }>()
);

export const removeTaskByIdSuccess = createAction(
  '[Task List] Remove Task By ID - Success',
  props<{ taskId: string }>()
);

export const removeTaskByIdFailure = createAction(
  '[Task List] Remove Task By ID - Failure',
  props<{ error: any }>()
);
