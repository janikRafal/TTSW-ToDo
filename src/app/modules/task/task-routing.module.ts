import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskHomeComponent } from './components/task-home/task-home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskGuard } from 'src/app/shared/task-guard/task-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TaskHomeComponent,
    children: [
      { path: 'task-list', component: TaskListComponent },
      {
        path: 'task',
        children: [
          {
            path: '',
            redirectTo: 'not-found',
            pathMatch: 'full',
          },
          {
            path: ':id',
            component: TaskDetailComponent,
            canActivate: [TaskGuard],
          },
          {
            path: ':id/edit',
            component: TaskEditComponent,
            canActivate: [TaskGuard],
          },
        ],
      },
      { path: 'add-task', component: TaskFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
