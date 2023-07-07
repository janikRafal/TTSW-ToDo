import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  taskId!: string;
  task!: ITask | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const taskId = params.get('id')!;
          return this.taskService.getTaskById(taskId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((task) => (this.task = task));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChangeStatus(taskId: string) {
    this.taskService.changeTaskStatusById(taskId);
    // this.router.navigate(['/tasks']);
  }

  onGoBack() {
    this.router.navigate(['/tasks']);
  }
}
