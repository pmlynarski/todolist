import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SOMETHING_TO_INJECT, TodoItem, TodoItemStatus } from '../../models/todo-list.models';
import { FormControl } from '@angular/forms';
import { TodoListStorageService } from './todo-list-storage.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnDestroy {
  private _destroyed: Subject<void> = new Subject<void>();
  public data: TodoItem[] = [];
  public data$!: Observable<TodoItem[]>;

  public inputFormControl: FormControl = new FormControl();

  constructor(
    private cdRef: ChangeDetectorRef,
    private storage: TodoListStorageService,
    @Inject(SOMETHING_TO_INJECT) private injection: string,
  ) {
    this.data$ = this.storage.todoListData$;
  }

  public ngOnInit(): void {
    this.storage.todoListData$.pipe(takeUntil(this._destroyed)).subscribe((data) => {
      this.data = data;
      this.cdRef.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
  }

  public saveItem(): void {
    this.storage.setTodoListData([new TodoItem(this.inputFormControl.value, TodoItemStatus.NOT_DONE), ...this.data]);
  }

  public toggleStatus(index: number): void {
    this.data[index]?.toggleStatus();
    this.cdRef.markForCheck();
  }

  public trackFn(index: number, _: TodoItem) {
    return index;
  }
}
