import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { Todo } from '../redux/todo/todo.model';
import { OfflineService } from './offline.service';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    constructor(private http: HttpClient, private offlineService: OfflineService) { }

    getAll(): Observable<Todo[]>{
        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').pipe(
            catchError((e: Error) => this.offlineService.handleOfflineError(e, {
                defaultValue: Array<Todo>()
            }))
        );
    }

    createOne(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo).pipe(
            map((todo: Todo) => {
                // typicode always returns the same id, so we need to make up our own
                const id = Math.floor(Math.random() * 1000) + 1;
                todo.id = id.toString();
                return todo;
            }),
            catchError((e: Error) => this.offlineService.handleOfflineError(e, {
                defaultValue: <Todo>{
                    ...todo,
                    id: this.offlineId()
                }
            }))
        );
    }

    updateOne(todo: Todo): Observable<Todo> {
        return this.http.patch<Todo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo).pipe(
            catchError((e: Error) => this.offlineService.handleOfflineError(e, {
                defaultValue: <Todo>{
                    ...todo,
                }
            }))
        );
    }

    deleteOne(id: string): Observable<string> {
        return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`).pipe(
            map(() => id),
            catchError((e: Error) => this.offlineService.handleOfflineError(e, {
                defaultValue: id
            }))
        );
    }

    private offlineId(): string {
        return `offline-${new Date().getTime()}`;
    }
}