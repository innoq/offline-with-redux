import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/app.model';
import { updateTodo } from 'src/app/redux/todo/todo.actions';
import { Todo } from 'src/app/redux/todo/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  todos$!: Observable<readonly Todo[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.todos$ = this.store.select((state: AppState) => state.todos);
  }

  onCompleted(todo: Todo): void {
    this.store.dispatch(updateTodo( { todo }));
  }

}
