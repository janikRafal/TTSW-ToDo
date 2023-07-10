import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    description: new FormControl(''),
  });

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.taskService.setHeader('Add a new task');
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const { title, description } = this.taskForm.value;

    if (this.taskForm.invalid || !title) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const newTask = {
      title,
      description: description ?? '',
      status: false,
    };

    this.taskService.addNewTask(newTask).subscribe();
    this.router.navigate(['todo/task-list']);
  }

  onGoBack() {
    this.router.navigate(['todo/task-list']);
  }
}
