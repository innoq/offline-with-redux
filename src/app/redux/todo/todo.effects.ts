import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { TodoService } from "../../services/todo.service";
import {
  addTodo,
  loadTodos,
  removeTodo,
  todoAdded,
  todoRemoved,
  todosLoaded,
  todoUpdated,
  updateTodo,
} from "./todo.actions";
import { Todo } from "./todo.model";

@Injectable()
export class TodoEffects {
  loadTodos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService
          .getAll()
          .pipe(map((todos: Todo[]) => todosLoaded({ todos })))
      )
    )
  );

  addTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      mergeMap((action) =>
        this.todoService
          .createOne(action.todo)
          .pipe(map((todo: Todo) => todoAdded({ todo })))
      )
    )
  );

  updateTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      mergeMap((action) =>
        this.todoService
          .updateOne(action.todo)
          .pipe(map((todo: Todo) => todoUpdated({ todo })))
      )
    )
  );

  deleteTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodo),
      mergeMap((action) =>
        this.todoService
          .deleteOne(action.id)
          .pipe(map((id: string) => todoRemoved({ id })))
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
