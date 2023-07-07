import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit, OnDestroy {
  task!: ITask | undefined;
  private destroy$ = new Subject<void>();
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
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
          this.taskForm.patchValue({
            title: this.task.title,
            description: this.task.description,
          });
        }
      });
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
      this.taskService.editTaskById(this.task.id, {
        title,
        description: description || '',
      });
      this.router.navigate(['/tasks']);
    }
  }

  onGoBack() {
    if (this.task?.id) {
      this.router.navigate([`task/${this.task.id}`]);
    } else this.router.navigate(['/tasks']);
  }
}
