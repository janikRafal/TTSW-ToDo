import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskHomeComponent } from './components/task-home/task-home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

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
            path: ':id',
            component: TaskDetailComponent,
          },
          {
            path: ':id/edit',
            component: TaskEditComponent,
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
