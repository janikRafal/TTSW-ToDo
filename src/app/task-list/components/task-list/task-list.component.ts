import { Component } from '@angular/core';

import { TaskServiceService } from 'src/app/services/task-service.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  tasks!: Task[];

  constructor(private taskService: TaskServiceService) {}

  ngOnInit() {
    this.tasks = this.taskService.getAllTasks();
  }
}
