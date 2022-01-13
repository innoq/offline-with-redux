import { createReducer, on } from '@ngrx/store';

import { todoAdded, todoRemoved, todoUpdated, todosLoaded } from './todo.actions';
import { Todo } from './todo.model';

export const initialState: ReadonlyArray<Todo> = [];

export const todosReducer = createReducer(
    initialState,
    on(todoAdded, (state, { todo }) => state.concat(todo)),
    on(todoRemoved, (state, { id }) => state.filter((todo: Todo) => todo.id !== id)),
    on(todoUpdated, (state, { todo }) => state.filter((t: Todo) => t.id !== todo.id).concat(todo)),
    on(todosLoaded, (state, { todos }) =>todos),
);