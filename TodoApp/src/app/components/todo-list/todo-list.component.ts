import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[]=[];

  constructor() { };

  ngOnInit(): void {
    this.todos = [
      {
        content: 'First Todo',
        completed: false
      },
      {
        content: 'Second Todo',
        completed: false
      },
    ];
  };

  alertWithSuccess(todo: string, type:number, status?:string ){  
    Swal.fire('Thank you...',
     (type == 1 ? `${todo} status has been changed to ${status}` : `${todo} status has been deleted`),
      'success'
    );
  }

  erroalert(error: string)  
  {  
    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: `Id ${error} not found!`,  
    })  
  } 
  
  async editTodo(id: number){
    const { value: newContent } = await Swal.fire({
      title: `Input new todo for id:${id}`,
      input: 'text',
      inputPlaceholder: 'Input new todo content'
    })
    
    if (newContent) {
      this.todos[id].content = String(newContent);
      Swal.fire(
        'Success',
        `id: ${id} updated to ${String(newContent)}`,
        'success'
      )
    }else{
      Swal.fire(
        'Error',
        'Something went wrong, data not update',
        'error'
      )
    }
  }
  
  toggleDone(id: number){
    this.todos.map((v, i) => {
      if (i == id) v.completed = !v.completed;{
        console.log(v);
        if (this.todos[id]){
          this.alertWithSuccess(this.todos[id].content, 1, (this.todos[id].completed == true ? 'Done' : 'Not Done'));
        }else{
          this.erroalert(String(id));
        }
      }
      return v;
    });
  };

  deleteTodo(id:number){
    this.alertWithSuccess(this.todos[id].content, 0);
    this.todos = this.todos.filter((v, i) => i !== id);
  }

  addTodo(todo: Todo){
    this.todos.push(todo);
  }
}
