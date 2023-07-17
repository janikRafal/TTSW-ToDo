import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TaskService } from 'src/app/modules/task/task.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskGuard {
  constructor(private taskService: TaskService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const taskId = route.paramMap.get('id');
    if (taskId) {
      return this.taskService.fetchTaskById(taskId).pipe(
        tap((task) => {
          if (!task) {
            this.router.navigate(['/not-found']);
          }
        }),
        map((task) => !!task),
        catchError(() => {
          this.router.navigate(['/not-found']);
          return of(false);
        })
      );
    }
    return false;
    return true;
  }
}
