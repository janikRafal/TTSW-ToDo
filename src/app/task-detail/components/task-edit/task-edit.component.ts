import { Component } from '@angular/core';

import { TaskServiceService } from 'src/app/services/task-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent {
  task!: Task | undefined;
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(
    private taskService: TaskServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      throw new Error('Task ID is missing in the route');
    }

    this.task = this.taskService.getTaskById(taskId);

    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
      });
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const { title, description } = this.taskForm.value;

    if (this.taskForm.invalid || !title) {
      this.taskForm.markAllAsTouched();
      return;
    }

    if (this.task) {
      this.taskService.editTaskById(this.task.id, {
        title,
        description: description || '',
      });
      this.router.navigate(['/tasks']);
    }
  }

  onGoBack() {
    this.router.navigate(['/tasks']);
  }
}
