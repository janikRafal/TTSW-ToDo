import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskServiceService } from 'src/app/services/task-service.service';

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

  constructor(private taskService: TaskServiceService) {}

  onFormSubmit(event: Event) {
    event.preventDefault();
    console.log('Yes yes gps ma kudlaty pies');
  }
}
