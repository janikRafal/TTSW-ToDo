import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
})
export class TaskHomeComponent {
  @Input() pageHeader!: string;

  constructor(
    private taskService: TaskService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.taskService.pageHeader$.subscribe((header) => {
      this.pageHeader = header;
      this.cdRef.detectChanges();
    });
  }
}
