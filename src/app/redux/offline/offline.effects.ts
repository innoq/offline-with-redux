import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { OfflineService } from 'src/app/services/offline.service';
import { AppState } from '../app.model';
import { replaceOfflineTodo } from '../todo/todo.actions';
import { Todo } from '../todo/todo.model';
import { changeToOnline, removeOfflineRequest, startSynchingRequests, synchingFinished } from './offline.actions';
import { OfflineRequest } from './offline.model';

@Injectable()
export class OfflineEffects {

    sendStoredRequests$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(changeToOnline),
        map(() => startSynchingRequests())
    ));

    private _resendRequests$ = createEffect(() => this.actions$.pipe(
        ofType(startSynchingRequests),
        concatLatestFrom(() => this.store.select((state: AppState) => state.offline.requests)),
        tap(([_action, requests]) => {
            console.log('👀', requests);
            requests.map((request: OfflineRequest) => {
                console.log('🙂', request);
                this.offlineService.resendRequest(request.request).pipe(
                    tap((todo: Todo) => {
                        // typicode always returns the same id, so we need to make up our own
                        const id = Math.floor(Math.random() * 1000) + 1;
                        todo.id = id.toString();
                        this.store.dispatch(replaceOfflineTodo({ id: request.id, todo }));
                        this.store.dispatch(removeOfflineRequest({ id: request.id }));
                    })
                ).subscribe();
            })
        }),
        map(() => synchingFinished())
    ));
    public get resendRequests$() {
        return this._resendRequests$;
    }
    public set resendRequests$(value) {
        this._resendRequests$ = value;
    }

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private offlineService: OfflineService,
    ) { }
}
