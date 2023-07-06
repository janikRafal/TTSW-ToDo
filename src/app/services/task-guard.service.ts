import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TaskServiceService } from './task-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskGuard {
  constructor(
    private taskService: TaskServiceService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const taskId = route.params['id'];
    return this.taskService.getTaskById(taskId).pipe(
      map((task) => {
        if (task) {
          return true;
        } else {
          return this.router.parseUrl('/not-found');
        }
      })
    );
  }
}
