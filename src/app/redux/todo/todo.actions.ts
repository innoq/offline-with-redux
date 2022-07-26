import { createAction, props } from '@ngrx/store';
import { Todo } from './todo.model';

export const addTodo = createAction('[Todo] Add Todo',
                                    props<{todo: Todo}>());
export const todoAdded = createAction('[Todo] Todo Added',
                                    props<{todo: Todo}>());
export const removeTodo = createAction('[Todo] Remove Todo',
                                    props<{id: string}>());
export const todoRemoved = createAction('[Todo] Todo Removed',
                                    props<{id: string}>());
export const updateTodo = createAction('[Todo] Update Todo',
                                    props<{todo: Todo}>());
export const todoUpdated = createAction('[Todo] Todo updated',
                                    props<{todo: Todo}>());
export const loadTodos = createAction('[Todo] Load Todos');
export const todosLoaded = createAction('[Todo] Todos loaded',
                                    props<{todos: Todo[]}>());
export const replaceOfflineTodo = createAction('[Todo] Replace offline Todo',
                                    props<{id: string, todo: Todo}>())