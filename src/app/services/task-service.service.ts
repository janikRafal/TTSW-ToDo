import { Injectable } from '@angular/core';

import { Task } from '../models/task';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  tasks: Task[] = [
    {
      id: '0c65b98b-ae4d-4b50-bcc3-249cad3ac9a4',
      title: 'Add modal window which confirms task deleting',
      description:
        'You should add modal window on task-list view, now you have an alert.',
      status: false,
    },
    {
      id: '7c91894d-f08f-40f0-b17c-5575c3e18892',
      title: 'Create task-list page',
      description: 'You still have to create task-list page!',
      status: true,
    },
    {
      id: '4195aa58-3d24-4d11-828e-17042f02c08a',
      title: 'Create task-form page',
      description: 'You still have to create task-form page!',
      status: true,
    },
    {
      id: '7387b17c-f4ac-4f15-a70c-e0928f685060',
      title: 'Create task-detail page',
      description: 'You still have to create task-detail page!',
      status: false,
    },
    {
      id: '7e670401-d32e-4e36-8968-d23c967d9200',
      title: 'Get feedback from Adrian and Marek',
      description:
        'If you finished, send your work to TTSW group and wait for feedback',
      status: false,
    },
  ];

  constructor() {}

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  addNewTask(task: Task) {
    this.tasks.push(task);
  }

  editTaskById(id: string, data: { title: string; description: string }) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title: data.title,
          description: data.description,
        };
      } else {
        return task;
      }
    });
  }

  changeTaskStatusById(id: string) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: !task.status,
        };
      } else {
        return task;
      }
    });

    console.log(this.tasks);
  }

  removeTaskById(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
