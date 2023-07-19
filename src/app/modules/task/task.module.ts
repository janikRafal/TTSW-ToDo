import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { TaskRoutingModule } from './task-routing.module';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskHomeComponent } from './components/task-home/task-home.component';

import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTask from './store/reducers';
import { TaskEffects } from './store/task.effects';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    TaskDetailComponent,
    TaskEditComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskHomeComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ReactiveFormsModule,
    CardModule,
    DataViewModule,
    DividerModule,
    ButtonModule,
    TooltipModule,
    PanelModule,
    SharedModule,
    ProgressSpinnerModule,
    SkeletonModule,
    ProgressBarModule,
    ClipboardModule,
    StoreModule.forFeature(fromTask.taskFeatureKey, fromTask.taskReducer),
    EffectsModule.forFeature([TaskEffects]),
  ],
})
export class TaskModule {}
