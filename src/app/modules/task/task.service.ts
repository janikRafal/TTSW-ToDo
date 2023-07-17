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

  setHeader(header: string) {
    this.pageHeader.next(header);
  }

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

  removeTaskByIdStore(taskId: string) {
    return this.http.delete<ITask>(`${this.apiUrl}/${taskId}`);
  }
}
