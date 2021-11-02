import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../models/Todo'

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent {
  @Output() newTodoEvent = new EventEmitter<Todo>();

  //Update 10/29/2021 Update element form element into 1 merged object
  form: {
    todoForm: FormGroup;
    isSubmitted: boolean;
    errors: any;
  } = {
    todoForm: new FormGroup({
      todoNewItems: new FormControl('',
       [
        Validators.required,
        Validators.minLength(15),
        Validators.pattern("[a-zA-Z ]*")
      ] )
    }),
    isSubmitted: false,
    errors: {}
  }

  //Getter for form spesific value
  get todoNewItems(){
    return this.form.todoForm.get('todoNewItems');
  };

  //Push error & Delete error from array object in form
  validateForm () {
    if(this.todoNewItems?.errors)
      this.form.errors.todoNewItems = { ...this.todoNewItems?.errors }
    else
      delete this.form.errors.todoNewItems
  };

  //Handle event submit form
  onSubmit(){
    this.switchSubmittedState(true);
    this.validateForm();
    if (Object.keys(this.form.errors).length === 0){
      const todo: Todo = {
        content: this.form.todoForm.value.todoNewItems,
        completed: false
      };
      this.newTodoEvent.emit(todo);
      this.form.todoForm.reset();
    }
  };

  //Change submitted form state
  switchSubmittedState (state: boolean) {
    this.form.isSubmitted = state;
  }; 

}
