import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ITask } from '../../models/task';
import { IDictionary } from 'src/app/models/dictionary';

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

  constructor(private http: HttpClient) {}

  fetchTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  fetchTaskById(taskId: string): Observable<ITask> {
    return this.http.get<ITask>(`${this.apiUrl}/${taskId}`);
  }

  addNewTaskStore(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task);
  }

  editTaskByIdStore(task: ITask) {
    const { _id, title, description, status } = task;

    return this.http.put<ITask>(`${this.apiUrl}/${_id}`, {
      title,
      description,
      status,
    });
  }

  //-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//

  getTasks() {
    if (this.taskList.getValue().length === 0) {
      return this.http
        .get<ITask[]>(this.apiUrl)
        .pipe(tap((tasks) => this.taskList.next(this.sortTasks(tasks))));
    }

    return this.taskList.asObservable();
  }

  getDictionaries() {
    const tasks$ =
      this.taskList.getValue().length === 0
        ? this.getTasks()
        : this.taskList.asObservable();

    return tasks$.pipe(
      map((tasks) =>
        tasks.map(
          (task) =>
            ({
              id: task._id,
              label: task.title,
            } as IDictionary)
        )
      )
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
