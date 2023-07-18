import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  tap,
  catchError,
  retryWhen,
  delay,
  take,
  concat,
} from 'rxjs/operators';
import { TaskService } from '../modules/task/task.service';
import { ApiService } from '../modules/task/api.service';

@Injectable()
export class LimitInterceptor implements HttpInterceptor {
  constructor(private apiService: ApiService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.apiService.incrementRequestCount();
    console.log(
      'console from interceptor, request count: ',
      this.apiService.requestCount
    );
    return next.handle(request);
  }
}
