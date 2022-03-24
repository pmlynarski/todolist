import { Pipe, PipeTransform } from '@angular/core';
import { TodoItemStatus } from '../../../models/todo-list.models';

@Pipe({
  name: 'isItemDone',
})
export class IsItemDonePipe implements PipeTransform {
  public transform(value: TodoItemStatus): boolean {
    return value === TodoItemStatus.DONE;
  }
}
