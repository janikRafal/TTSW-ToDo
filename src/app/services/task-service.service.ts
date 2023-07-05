import { Injectable } from '@angular/core';

import { Task } from '../models/task';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  tasks: Task[] = [
    {
      id: uuid.v4(),
      title: 'Create task-list page',
      description: 'You still have to create task-list page!',
    },
    {
      id: uuid.v4(),
      title: 'Create task-form page',
      description: 'You still have to create task-form page!',
    },
    {
      id: uuid.v4(),
      title: 'Create task-detail page',
      description: 'You still have to create task-detail page!',
    },
    {
      id: uuid.v4(),
      title: 'Get feedback from Adrian and Marek',
      description:
        'If you finished, send your work to TTSW group and wait for feedback',
    },
  ];

  constructor() {}

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
}
