import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TodoItem } from '../../../models/todo-list.models';
import { FormControl } from '@angular/forms';
import { IsItemDonePipe } from './is-item-done.pipe';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit, OnDestroy {
  private _destroyed: Subject<void> = new Subject();
  public item!: TodoItem;

  @Input()
  public set data(val: TodoItem) {
    this.item = val;
    this.formControl.setValue(this.isItemDonePipe.transform(val.status), { emitEvent: false });
  }

  @Output()
  public toggleStatus: EventEmitter<void> = new EventEmitter();

  public formControl: FormControl = new FormControl();

  constructor(private isItemDonePipe: IsItemDonePipe) {}

  public ngOnInit(): void {
    this.formControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this.toggleStatus.emit();
    });
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
  }
}
