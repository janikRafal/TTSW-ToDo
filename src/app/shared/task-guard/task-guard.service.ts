import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TaskService } from 'src/app/modules/task/task.service';
import { catchError, map, tap, switchMap, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import {
  selectTaskDetail,
  selectTaskFromStore,
} from 'src/app/modules/task/store/task.selectors';

@Injectable({
  providedIn: 'root',
})
export class TaskGuard {
  constructor(
    private taskService: TaskService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const taskId = route.paramMap.get('id');
    if (taskId) {
      return this.store.pipe(
        select(selectTaskDetail),
        switchMap((taskDetail) => {
          if (taskDetail && taskDetail._id === taskId) {
            return of(true);
          } else {
            return this.store.pipe(
              select(selectTaskFromStore(taskId)),
              take(1),
              switchMap((taskFromList) => {
                if (taskFromList) {
                  return of(true);
                } else {
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
              })
            );
          }
        })
      );
    }
    return false;
  }
}
