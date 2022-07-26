import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Todo } from "src/app/redux/todo/todo.model";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input()
  todo!: Todo;

  @Output()
  completed: EventEmitter<Todo> = new EventEmitter<Todo>();

  classes(): Object {
    const id: string = this.todo.id?.toString() ?? "";
    return {
      "todo-item": true,
      completed: this.todo.completed,
      offline: id.startsWith("offline") ?? false,
    };
  }

  complete(): void {
    const updatedTodo: Todo = { ...this.todo, completed: !this.todo.completed };
    this.completed.emit(updatedTodo);
  }
}
