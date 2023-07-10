import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';
import { ITask } from '../../models/task';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = `https://crudcrud.com/api/${environment.api_key}/todo`;

  private pageHeader = new BehaviorSubject<string>('To-Do App');

  pageHeader$ = this.pageHeader.asObservable();

  constructor(private http: HttpClient) {}

  private sortTasks(tasks: ITask[]): ITask[] {
    return tasks.sort((a, b) =>
      a.status === b.status ? 0 : a.status ? 1 : -1
    );
  }

  setHeader(header: string) {
    this.pageHeader.next(header);
  }

  getTasks() {
    return this.http
      .get<ITask[]>(this.apiUrl)
      .pipe(tap((task) => console.log(task)));
  }

  getTaskById(id: string) {
    return this.http.get<ITask>(`${this.apiUrl}/${id}`);
  }

  addNewTask(task: ITask) {
    return this.http.post<ITask>(this.apiUrl, task);
  }

  editTaskById(task: ITask) {
    const { _id, title, description, status } = task;

    return this.http.put<ITask>(`${this.apiUrl}/${_id}`, {
      title,
      description,
      status,
    });
  }

  removeTaskById(id: string) {
    return this.http.delete<ITask>(`${this.apiUrl}/${id}`);
  }
}
