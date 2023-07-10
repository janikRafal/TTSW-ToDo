import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TaskService } from '../../task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit, OnDestroy {
  task!: ITask | undefined;
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
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const taskId = params.get('id');
          if (!taskId) {
            throw new Error('Task ID is missing in the route');
          }
          return this.taskService.getTaskById(taskId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((task) => {
        this.task = task;

        if (this.task) {
          const { title, description } = this.task;
          this.taskForm.patchValue({
            title,
            description,
          });
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

    if (this.task) {
      this.taskService
        .editTaskById({ ...this.task, title, description: description ?? '' })
        .subscribe();
      this.router.navigate([`todo/task/${this.task._id}`]);
    }
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
