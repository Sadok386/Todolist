import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';
export enum statusResult {
  All,
  Pending,
  Completed,
}
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoListComponent implements OnInit {

  @Input()
 private statusList = 'All';

  private data: TodoListData;

  private titre: string;
  constructor(private todoService: TodoService) {
    todoService.getTodoListDataObserver().subscribe(tdl => this.data = tdl);
    this.titre = this.data.label;
  }

  ngOnInit() {
  }

  get label(): string {
    return this.data ? this.data.label : '';
  }

  get items(): TodoItemData[] {
    return this.data ? this.data.items : [];
  }

  appendItem(label: string) {
    console.log(label);
    this.todoService.appendItems(
      {
        label, isDone: false
      }
    );
  }
  itemDone(item: TodoItemData, done: boolean) {
    this.todoService.setItemsDone(done, item);
  }
  itemLabel(item: TodoItemData, label: string) {
    this.todoService.setItemsLabel(label, item);
}
itemDelete(item: TodoItemData) {
    this.todoService.removeItems(item);
}
removeCheckedItems() {
    this.data.items.map(item => {
      if (item.isDone) {
        this.todoService.removeItems(item);
      }
    });
}
  get statusResult() {return statusResult; }

  pendingList() {
    this.statusList = 'Pending'; }
  AllList() {
    this.statusList = 'All'; }
  CompletedList() {
    this.statusList = 'Completed'; }
    
    
  compteurChecked(){
    return (this.data.items.length - this.data.items.filter(item =>item.isDone).length);
  }
}
  

