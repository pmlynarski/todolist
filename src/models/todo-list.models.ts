import { InjectionToken } from '@angular/core';

export class TodoItem {
  public title!: string;
  public status!: TodoItemStatus;

  constructor(_title: string, _status: TodoItemStatus) {
    this.title = _title;
    this.status = _status;
  }

  public toggleStatus(): void {
    this.status = this.status === TodoItemStatus.DONE ? TodoItemStatus.NOT_DONE : TodoItemStatus.DONE;
  }
}

export enum TodoItemStatus {
  DONE,
  NOT_DONE,
}

export const SOMETHING_TO_INJECT = new InjectionToken<string>('injectionToken');
