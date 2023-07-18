import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiKey = 'f1dee3a011b3464884786847a2209d3d';
  public requestCount = 0;

  constructor(private http: HttpClient) {}

  incrementRequestCount(): void {
    this.requestCount++;
  }

  fetchNewApiUrl() {
    return this.http
      .get('https://crudcrud.com/', { responseType: 'text' })
      .pipe(
        tap((response) => {
          const regex = /https:\/\/crudcrud\.com\/api\/([0-9a-fA-F]{32})/;
          const match = response.match(regex);
          if (match) {
            this.apiKey = match[1];
            console.log('API KEY:', this.apiKey);
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

  checkRequestsAmount(): Observable<number> {
    const url = `https://crudcrud.com/Dashboard/${this.apiKey}`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response) => {
        const regex = /<div class="title">(\d+) \/ 100<\/div>/;
        const match = response.match(regex);
        if (match) {
          console.log('Amount of request:', parseInt(match[1]));
          this.requestCount = parseInt(match[1]);
          return parseInt(match[1]);
        } else {
          console.log('No match found');
          return 100;
        }
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      }),
      tap(() => console.log(this.requestCount))
    );
  }
}
