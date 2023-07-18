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
    if (!request.params.has('skipInterceptor')) {
      this.apiService.incrementRequestCount();
    }
    return next.handle(request);
  }
}
