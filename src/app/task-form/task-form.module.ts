import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskFormRoutingModule } from './task-form-routing.module';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TaskFormComponent],
  imports: [
    CommonModule,
    TaskFormRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TaskFormModule {}
