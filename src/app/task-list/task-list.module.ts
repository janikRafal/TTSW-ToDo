import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';

import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [TaskListComponent],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    CardModule,
    DataViewModule,
    DividerModule,
    ButtonModule,
    TooltipModule,
  ],
})
export class TaskListModule {}
