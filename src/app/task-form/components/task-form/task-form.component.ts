import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { Router } from '@angular/router';
import * as uuid from 'uuid';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(
    private taskService: TaskServiceService,
    private router: Router
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    const { title, description } = this.taskForm.value;

    if (this.taskForm.invalid || !title) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const newTask = {
      id: uuid.v4(),
      title,
      description: description || '',
      status: false,
    };

    this.taskService.addNewTask(newTask);
    this.router.navigate(['/tasks']);
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}
