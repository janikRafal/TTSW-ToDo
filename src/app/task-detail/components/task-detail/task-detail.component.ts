import { Component } from '@angular/core';

import { TaskServiceService } from 'src/app/services/task-service.service';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id')!;

    this.task = this.taskService.getTaskById(taskId);
  }
}
