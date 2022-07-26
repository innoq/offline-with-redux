import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.model';
import { addTodo } from 'src/app/redux/todo/todo.actions';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent implements OnInit {

  form!: UntypedFormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
      this.form = new UntypedFormGroup({
        title: new UntypedFormControl('', Validators.required),
        completed: new UntypedFormControl(false)
      })
  }

  onSaveTodo(): void {
    if (this.form.valid) {
      this.store.dispatch(addTodo( { todo: { title: this.form.get('title')?.value, completed: this.form.get('completed')?.value }}))
      this.form.setValue({ title: '', completed: false });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
