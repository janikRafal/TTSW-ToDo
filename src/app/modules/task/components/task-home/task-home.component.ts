import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../task.service';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { ApiService } from '../../api.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getTasksSuccess } from '../../store/task.actions';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
})
export class TaskHomeComponent {
  @Input()
  protected pageHeader!: string;
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private cdRef: ChangeDetectorRef,
    private apiService: ApiService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.apiService
      .checkRequestsAmount()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.apiService.requestCount$
      .pipe(
        takeUntil(this.destroy$),
        tap((requestCount) => {
          if (requestCount >= 20) {
            this.apiService.fetchTasks(true).subscribe((tasks) => {
              this.store.dispatch(getTasksSuccess({ tasks }));
            });
            this.apiService.setRequestCountSubject(0);

            this.apiService.fetchNewApiUrl().subscribe(() => {
              this.taskService.apiUrl = `https://crudcrud.com/api/${this.apiService.apiKey}/todo`;
            });
          }
        })
      )
      .subscribe((requestCount) => {
        console.log('Request count: ', requestCount);
      });

    this.taskService.pageHeader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((header) => {
        this.pageHeader = header;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
