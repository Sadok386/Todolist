import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TodoListData } from '../dataTypes/TodoListData';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { TodoService } from '../todo.service';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
declare var webkitSpeechRecognition: any;
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
  faTrash = faTrash;

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
  get statusResult() { return statusResult; }

  pendingList() {
    this.statusList = 'Pending';
  }
  AllList() {
    this.statusList = 'All';
  }
  CompletedList() {
    this.statusList = 'Completed';
  }



  compteurChecked() {
    return (this.data.items.length - this.data.items.filter(item => item.isDone).length);
  }


  checkValueSpeech(valeur: string) {
    this.appendItem(valeur)

  }
  record() {

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "fr-FR";
    var final_transcript = '';
    var valeur = '';
    recognition.onerror = function (event) {
      console.error(event);
    };

    recognition.onstart = function () {
      console.log('Speech recognition service has started');
    };

    
    recognition.onend = (() => {
      console.log('Speech recognition service disconnected'+final_transcript);
      
       valeur = 'yo'

      })



    recognition.onresult = ((event) => {

      var interim_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        // Verify if the recognized text is the last with the isFinal property
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }


      // Choose which result may be useful for you

      console.log("Interim: ", interim_transcript);
      console.log("Final: ", final_transcript);

      console.log("Simple: ", event.results[0][0].transcript);

    });
    const main = async() =>{
      try{
        recognition.start();
        recognition.onend();
      }
      catch{
        console.log('IsAgirou');
      }
    }
main()
    .then(() =>  this.appendItem(valeur));
    
  }
  //Supprime tous les items
  removeAll() {
    // console.log("Supprime tout");
    this.data.items.forEach(item => {
      this.todoService.removeItems(item);
    });
  }


}


