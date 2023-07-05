import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailRoutingModule } from './task-detail-routing.module';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

@NgModule({
  declarations: [TaskDetailComponent],
  imports: [CommonModule, TaskDetailRoutingModule],
})
export class TaskDetailModule {}
