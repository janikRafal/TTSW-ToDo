import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, of } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { TaskService } from '../../task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import {
  selectTaskDetail,
  selectTaskFromStore,
} from '../../store/task.selectors';
import { editTaskById, getTaskById } from '../../store/task.actions';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit, OnDestroy {
  private task!: ITask;
  private destroy$ = new Subject<void>();

  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    description: new FormControl(''),
  });

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id')!;

    this.store
      .pipe(
        select(selectTaskDetail),
        takeUntil(this.destroy$),
        switchMap((taskDetail) => {
          if (taskDetail && taskDetail._id === taskId) {
            return of(taskDetail);
          } else {
            return this.store.pipe(
              select(selectTaskFromStore(taskId)),
              take(1),
              tap((taskFromList) => {
                if (!taskFromList) {
                  this.store.dispatch(getTaskById({ taskId }));
                }
              }),
              switchMap(() => this.store.pipe(select(selectTaskDetail)))
            );
          }
        })
      )
      .subscribe((task) => {
        if (task) {
          this.taskForm.get('title')?.setValue(task.title);
          this.taskForm.get('description')?.setValue(task.description);
          this.task = task;
        }
      });

    this.taskService.setHeader('Task edit');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const { title, description } = this.taskForm.value;

    if (this.taskForm.invalid || !title) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const updatedTask = { ...this.task, title, description: description ?? '' };

    this.store.dispatch(editTaskById({ task: updatedTask }));
    // this.router.navigate([`todo/task/${this.task._id}`]);
  }

  onGoBack() {
    const { title, description } = this.taskForm.value;
    const confirmText =
      'Are you sure you want to go back? Changes will be lost.';
    if (
      this.task &&
      (this.task.title !== title || this.task.description !== description) &&
      !confirm(confirmText)
    ) {
      return;
    }
    if (this.task?._id) {
      this.router.navigate([`todo/task/${this.task._id}`]);
    } else {
      this.router.navigate(['todo/task-list']);
    }
  }
}
