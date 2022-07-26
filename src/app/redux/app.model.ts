import { OfflineState } from "./offline/offline.model";
import { Todo } from "./todo/todo.model";

export interface AppState {
  todos: readonly Todo[];
  offline: OfflineState;
}
