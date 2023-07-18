import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ITask } from '../../models/task';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `https://crudcrud.com/api/${this.apiService.apiKey}/todo`;

  private pageHeader = new BehaviorSubject<string>('To-Do App');
  public pageHeader$ = this.pageHeader.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService) {}

  public setHeader(header: string) {
    this.pageHeader.next(header);
  }

  public fetchTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  public fetchTaskById(taskId: string): Observable<ITask> {
    return this.http.get<ITask>(`${this.apiUrl}/${taskId}`);
  }

  public addNewTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task);
  }

  public editTaskById(task: ITask) {
    const { _id, title, description, status } = task;

    return this.http.put<ITask>(`${this.apiUrl}/${_id}`, {
      title,
      description,
      status,
    });
  }

  public removeTaskById(taskId: string) {
    return this.http.delete<ITask>(`${this.apiUrl}/${taskId}`);
  }
}
