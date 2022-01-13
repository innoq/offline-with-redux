import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../redux/todo.model';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<Todo[]>{
        return this.http.get<Todo[]>('/todos');
    }

    createOne(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>('/todos', todo);
    }

    updateOne(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(`/todos/${todo.id}`, todo);
    }

    deleteOne(id: string): Observable<void> {
        return this.http.delete<void>(`/todos/${id}`);
    }
}