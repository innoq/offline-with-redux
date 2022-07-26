import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { AppComponent } from "./app.component";
import { ErrorInterceptor } from "./offline-error.interceptor";
import { OfflineBannerComponent } from "./offline/components/offline-banner/offline-banner.component";
import { OfflineEffects } from "./redux/offline/offline.effects";
import { offlineReducer } from "./redux/offline/offline.reducer";
import { TodoEffects } from "./redux/todo/todo.effects";
import { todosReducer } from "./redux/todo/todo.reducer";
import { TodoFormComponent } from "./todo/components/todo-form/todo-form.component";
import { TodoItemComponent } from "./todo/components/todo-item/todo-item.component";
import { TodoListComponent } from "./todo/components/todo-list/todo-list.component";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoFormComponent,
    OfflineBannerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ todos: todosReducer, offline: offlineReducer }),
    EffectsModule.forRoot([TodoEffects, OfflineEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
