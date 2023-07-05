import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskFormRoutingModule } from './task-form-routing.module';
import { TaskFormComponent } from './components/task-form/task-form.component';


@NgModule({
  declarations: [
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    TaskFormRoutingModule
  ]
})
export class TaskFormModule { }
