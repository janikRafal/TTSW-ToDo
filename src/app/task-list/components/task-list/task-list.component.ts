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

  onTaskDelete(taskId: string, taskTitle: string): void {
    const text = `Confirm that you REALLY want to remove this task:\n\n"${taskTitle}"`;

    if (confirm(text) === true) {
      this.taskService.removeTaskById(taskId);
      this.tasks = this.taskService.getAllTasks();
    } else {
      return;
    }
  }
}
