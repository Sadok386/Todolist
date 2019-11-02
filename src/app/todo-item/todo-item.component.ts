import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoItemData} from "../dataTypes/TodoItemData";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
@Input() private data: TodoItemData;
public edit = false

  constructor(private  todoService: TodoService) { }

  ngOnInit() {
  }
  get label(): string {
  return this.data.label;
  }
  removeData() {
    this.todoService.removeItems(this.data);
  }
  dataDone(done: boolean) {
    this.todoService.setItemsDone(done, this.data);
  }

}
