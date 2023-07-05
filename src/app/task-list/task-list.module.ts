import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
@NgModule({
  declarations: [TaskListComponent],
  imports: [CommonModule, TaskListRoutingModule],
})
export class TaskListModule {}
