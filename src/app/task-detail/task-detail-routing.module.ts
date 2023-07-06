import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskGuard } from '../services/task-guard.service';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

const routes: Routes = [
  { path: ':id/edit', component: TaskEditComponent, canActivate: [TaskGuard] },
  { path: ':id', component: TaskDetailComponent, canActivate: [TaskGuard] },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskDetailRoutingModule {}
