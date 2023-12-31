import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../task.service';
import { Subject, take, takeUntil, tap, forkJoin, switchMap, of } from 'rxjs';
import { ApiService } from '../../api.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getTasksSuccess } from '../../store/task.actions';
import { selectTaskList, selectTaskState } from '../../store/task.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
})
export class TaskHomeComponent {
  @Input()
  protected pageHeader!: string;
  protected requestCount!: number;
  protected currentApiKey: string = this.apiService.apiKey;
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
          this.requestCount = requestCount;

          if (requestCount >= 90) {
            this.apiService.fetchTasks(true).subscribe((tasks) => {
              this.store.dispatch(getTasksSuccess({ tasks }));
            });
            this.apiService.setRequestCountSubject(1);

            this.apiService
              .fetchNewApiUrl()
              .pipe(
                tap(() => {
                  localStorage.setItem('api_key', this.apiService.apiKey);
                  this.currentApiKey = this.apiService.apiKey;
                }),
                switchMap(() => {
                  this.taskService.apiUrl = `https://crudcrud.com/api/${this.apiService.apiKey}/todo`;

                  return this.store.select(selectTaskList).pipe(take(1));
                }),
                switchMap((tasks) => {
                  if (tasks) {
                    const tasksRequests = tasks.map((task) =>
                      this.taskService.addNewTask({
                        title: task.title,
                        description: task.description,
                        status: task.status,
                      })
                    );

                    return forkJoin(tasksRequests);
                  } else {
                    return of([]);
                  }
                })
              )
              .subscribe({
                next: (tasks) => {
                  this.store.dispatch(getTasksSuccess({ tasks })),
                    this.apiService.setRequestCountSubject(tasks.length);
                },
                error: (err) => console.error('Error: ', err),
              });
          }
        })
      )
      .subscribe();

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
