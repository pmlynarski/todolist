import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IsItemDonePipe } from './todo-item/is-item-done.pipe';
import { TodoListStorageService } from './todo-list-storage.service';
import { SOMETHING_TO_INJECT } from '../../models/todo-list.models';

@NgModule({
  declarations: [TodoListComponent, TodoItemComponent, IsItemDonePipe],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [TodoListComponent],
  providers: [
    IsItemDonePipe,
    TodoListStorageService,
    {
      provide: SOMETHING_TO_INJECT,
      useValue: 'Something has been injected',
      multi: true,
    },
  ],
})
export class TodoListModule {}
