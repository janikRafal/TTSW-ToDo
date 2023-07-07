import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/todo/task-list',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    redirectTo: '/todo/task-list',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    loadChildren: () =>
      import('./modules/task/task.module').then((mod) => mod.TaskModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
