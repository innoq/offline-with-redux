import { createReducer, on } from '@ngrx/store';

import { todoAdded, todoRemoved, todoUpdated, todosLoaded, replaceOfflineTodo } from './todo.actions';
import { Todo } from './todo.model';

export const initialState: readonly Todo[] = [];

export const todosReducer = createReducer(
    initialState,
    on(todoAdded, (state, { todo }) => state.concat(todo)),
    on(todoRemoved, (state, { id }) => state.filter((todo: Todo) => todo.id !== id)),
    on(todoUpdated, (state, { todo }) => {
        const index = state.findIndex((t: Todo) => t.id === todo.id);
        return Object.assign([], state, { [index]: todo });
    }),
    on(todosLoaded, (_state, { todos }) => todos),
    on(replaceOfflineTodo, (state, { id, todo }) => {
        const index = state.findIndex((t: Todo) => t.id === id);
        return Object.assign([], state, { [index]: todo });
    }),
);