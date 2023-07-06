import { Component } from '@angular/core';

import { TaskServiceService } from 'src/app/services/task-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent {
  taskId!: string;
  task!: Task | undefined;

  constructor(
    private taskService: TaskServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id')!;

    this.task = this.taskService.getTaskById(taskId);
  }

  onChangeStatus(taskId: string) {
    console.log(taskId);
    this.taskService.changeTaskStatusById(taskId);
    this.router.navigate(['/tasks']);
  }

  onGoBack() {
    this.router.navigate(['/tasks']);
  }
}
