import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../task.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ApiService } from '../../api.service';

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
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.checkRequestsAmount().subscribe();

    this.taskService.pageHeader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((header) => {
        this.pageHeader = header;
        this.cdRef.detectChanges();
        console.log(this.apiService.requestCount);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
