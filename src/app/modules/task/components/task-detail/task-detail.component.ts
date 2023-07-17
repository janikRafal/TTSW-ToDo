import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil, switchMap, map, tap } from 'rxjs/operators';
import { TaskService } from '../../task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { getTaskById } from '../../store/task.actions';
import { selectTaskDetail, selectTaskList } from '../../store/task.selectors';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  task$!: Observable<ITask>;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id')!;

    this.task$ = this.store.pipe(
      select(selectTaskList),
      map((tasks) =>
        tasks ? tasks.find((task) => task._id === taskId) : undefined
      ),
      tap((task) => {
        if (!task) {
          this.store.dispatch(getTaskById({ taskId }));
        }
      }),
      switchMap((task) =>
        task ? of(task) : this.store.pipe(select(selectTaskDetail))
      ),
      map(
        (task) =>
          task || {
            _id: '',
            title: '',
            description: '',
            status: false,
          }
      )
    );

    this.taskService.setHeader('Task details');
  }

  onChangeStatus() {
    // if (!this.task) return;
    // const taskWithToggledStatus = { ...this.task, status: !this.task.status };
    // this.taskService.editTaskById(taskWithToggledStatus).subscribe(() => {
    //   this.task = taskWithToggledStatus;
    // });
  }

  onGoBack() {
    this.router.navigate(['todo/task-list']);
  }
}
