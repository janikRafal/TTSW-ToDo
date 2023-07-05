import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('./task-list/task-list.module').then((mod) => mod.TaskListModule),
  },
  {
    path: 'task',
    loadChildren: () =>
      import('./task-detail/task-detail.module').then(
        (mod) => mod.TaskDetailModule
      ),
  },
  {
    path: 'add-task',
    loadChildren: () =>
      import('./task-form/task-form.module').then((mod) => mod.TaskFormModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
