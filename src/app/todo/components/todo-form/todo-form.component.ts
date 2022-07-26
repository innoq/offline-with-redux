import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/redux/app.model";
import { addTodo } from "src/app/redux/todo/todo.actions";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>("", Validators.required),
      completed: new FormControl<boolean>(false),
    });
  }

  onSaveTodo(): void {
    if (this.form.valid) {
      this.store.dispatch(
        addTodo({
          todo: {
            title: this.form.value.title,
            completed: this.form.value.completed,
          },
        })
      );
      this.form.setValue({ title: "", completed: false });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
