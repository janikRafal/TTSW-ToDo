import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ITask } from 'src/app/models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiKey!: string;
  public apiUrl = `https://crudcrud.com/api/${this.apiKey}/todo`;

  private requestCountSubject = new BehaviorSubject<number>(0);
  public requestCount$ = this.requestCountSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedApiKey = localStorage.getItem('api_key');

    this.apiKey = savedApiKey ? savedApiKey : environment.api_key;
  }

  public incrementRequestCount(): void {
    const currentCount = this.requestCountSubject.getValue();
    this.requestCountSubject.next(currentCount + 1);
  }

  public setRequestCountSubject(amountOfRequest: number): void {
    this.requestCountSubject.next(amountOfRequest);
  }

  public fetchNewApiUrl() {
    return this.http
      .get('https://crudcrud.com/', { responseType: 'text' })
      .pipe(
        tap((response) => {
          const regex = /https:\/\/crudcrud\.com\/api\/([0-9a-fA-F]{32})/;
          const match = response.match(regex);
          if (match) {
            this.apiKey = match[1];
            console.log('NEW API KEY:', this.apiKey);
          } else {
            console.log('No URL found');
          }
        }),
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  public checkRequestsAmount(): Observable<number> {
    const url = `https://crudcrud.com/Dashboard/${this.apiKey}`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response) => {
        const regex = /<div class="title">(\d+) \/ 100<\/div>/;
        const match = response.match(regex);
        if (match) {
          // While checking, the next request is already being made for each view, so that's why we add +1.
          const requestCount = parseInt(match[1]) + 1;
          this.requestCountSubject.next(requestCount);
          return requestCount;
        } else {
          console.log('No match found');
          return 100;
        }
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  public fetchTasks(skipInterceptor = false): Observable<ITask[]> {
    let options = {};
    if (skipInterceptor) {
      options = { params: new HttpParams().set('skipInterceptor', 'true') };
    }
    return this.http.get<ITask[]>(this.apiUrl, options);
  }
}
