import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailRoutingModule } from './task-detail-routing.module';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [TaskDetailComponent, TaskEditComponent],
  imports: [
    CommonModule,
    TaskDetailRoutingModule,
    CardModule,
    DividerModule,
    ButtonModule,
    PanelModule,
    SharedModule,
    TooltipModule,
  ],
})
export class TaskDetailModule {}
