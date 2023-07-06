import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskFormRoutingModule } from './task-form-routing.module';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { SharedModule } from '../shared/shared.module';

import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [TaskFormComponent],
  imports: [
    CommonModule,
    TaskFormRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CardModule,
    DividerModule,
    ButtonModule,
  ],
})
export class TaskFormModule {}
