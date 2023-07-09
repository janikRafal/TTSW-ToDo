import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../../models/task';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskList = new BehaviorSubject<ITask[]>([
    {
      id: '1c16179f-38ea-433d-9600-50226a7172ba',
      title: 'Refactoring and improvements',
      description: "Refactor your code and use Marek's hints",
      status: false,
    },
    {
      id: '0c65b98b-ae4d-4b50-bcc3-249cad3ac9a4',
      title: 'Add modal window which confirms task deleting',
      description:
        'You should add modal window on task-list view, now you have an alert',
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
      status: true,
    },
    {
      id: '7e670401-d32e-4e36-8968-d23c967d9200',
      title: 'Get feedback from Adrian and Marek',
      description:
        'If you finished, send your work to TTSW group and wait for feedback',
      status: true,
    },
  ]);
  private pageHeader = new BehaviorSubject<string>('To-Do App');

  tasks$ = this.taskList.asObservable();
  pageHeader$ = this.pageHeader.asObservable();

  constructor() {
    this.taskList.next(this.sortTasks(this.taskList.value));
  }

  private sortTasks(tasks: ITask[]): ITask[] {
    return tasks.sort((a, b) =>
      a.status === b.status ? 0 : a.status ? 1 : -1
    );
  }

  setHeader(header: string) {
    this.pageHeader.next(header);
  }

  getTaskById(id: string) {
    return this.tasks$.pipe(
      map((tasks) => tasks.find((task) => task.id === id))
    );
  }

  addNewTask(task: ITask) {
    const newTasks = [...this.taskList.value, task];
    this.taskList.next(this.sortTasks(newTasks));
  }

  editTaskById(id: string, data: { title: string; description: string }) {
    this.taskList.next(
      this.taskList.value.map((task) =>
        task.id === id ? { ...task, ...data } : task
      )
    );
  }

  changeTaskStatusById(id: string) {
    const updatedTasks = this.taskList.value.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    this.taskList.next(this.sortTasks(updatedTasks));
  }

  removeTaskById(id: string) {
    const updatedTasks = this.taskList.value.filter((task) => task.id !== id);
    this.taskList.next(this.sortTasks(updatedTasks));
  }
}
