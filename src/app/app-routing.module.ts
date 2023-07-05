import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
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
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
