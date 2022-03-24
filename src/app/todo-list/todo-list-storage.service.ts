import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoItem } from '../../models/todo-list.models';

@Injectable()
export class TodoListStorageService {
  private _todoListData: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);

  public get todoListData$(): Observable<TodoItem[]> {
    return this._todoListData.asObservable();
  }

  public setTodoListData(value: TodoItem[]): void {
    this._todoListData.next(value);
  }

  constructor() {}
}
