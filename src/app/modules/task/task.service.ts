import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ITask } from '../../models/task';
import { IDictionary } from 'src/app/models/dictionary';
import { fetchTasks } from './store/task.actions';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = `https://crudcrud.com/api/${environment.api_key}/todo`;

  private taskList = new BehaviorSubject<ITask[]>([]);

  private pageHeader = new BehaviorSubject<string>('To-Do App');
  pageHeader$ = this.pageHeader.asObservable();

  constructor(
    private http: HttpClient,
    private store: Store<{ tasks: ITask[] }>
  ) {}

  getTasks(): Observable<ITask[]> {
    this.store.dispatch(fetchTasks());

    return this.store.select('tasks');
  }

  getDictionaries(): Observable<IDictionary[]> {
    this.store.dispatch(fetchTasks());

    return this.store
      .select((state) => state.tasks)
      .pipe(
        map((tasks: ITask[]) =>
          tasks.map(
            (task: ITask) =>
              ({
                id: task._id,
                label: task.title,
              } as IDictionary)
          )
        ),
        tap((dictionaries) => console.log('Dictionaries:', dictionaries))
      );
  }

  getTaskById(id: string) {
    if (this.taskList.getValue().length === 0) {
      return this.http.get<ITask>(`${this.apiUrl}/${id}`);
    }

    return this.taskList.pipe(
      map((tasks) => {
        return tasks.find((task) => task._id === id);
      })
    );
  }

  addNewTask(task: ITask) {
    return this.http.post<ITask>(this.apiUrl, task).pipe(
      tap((taskFromResponse) => {
        const tasks = this.taskList.getValue();
        tasks.unshift(taskFromResponse);
        const sortedTasks = this.sortTasks(tasks);

        this.taskList.next(sortedTasks);
      })
    );
  }

  removeTaskById(id: string) {
    return this.http.delete<ITask>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const tasks = this.taskList.getValue();
        const filteredTasks = tasks.filter((task) => task._id !== id);
        const sortedTasks = this.sortTasks(filteredTasks);

        this.taskList.next(sortedTasks);
      })
    );
  }

  editTaskById(task: ITask) {
    const { _id, title, description, status } = task;

    return this.http
      .put<ITask>(`${this.apiUrl}/${_id}`, {
        title,
        description,
        status,
      })
      .pipe(
        tap(() => {
          const tasks = this.taskList.getValue();
          const taskIndex = tasks.findIndex((task) => task._id === _id);

          if (taskIndex > -1) {
            tasks[taskIndex] = task;
            const sortedTasks = this.sortTasks(tasks);

            this.taskList.next(sortedTasks);
          }
        })
      );
  }

  private sortTasks(tasks: ITask[]): ITask[] {
    return tasks.sort((a, b) =>
      a.status === b.status ? 0 : a.status ? 1 : -1
    );
  }

  setHeader(header: string) {
    this.pageHeader.next(header);
  }

  getTaskStatusById(id: string) {
    return this.taskList.pipe(
      map((tasks) => {
        const task = tasks.find((task) => task._id === id);
        return task ? task.status : false;
      })
    );
  }
}
