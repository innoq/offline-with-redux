import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { map, mergeAll, Observable, switchMap, tap } from 'rxjs';
import { OfflineService } from 'src/app/services/offline.service';
import { AppState } from '../app.model';
import { changeToOnline, removeOfflineRequest, startSynchingRequests, synchingFinished } from './offline.actions';
import { OfflineRequest } from './offline.model';

@Injectable()
export class OfflineEffects {

    sendStoredRequests$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(changeToOnline),
        map(() => startSynchingRequests())
    ));

    resendRequests$ = createEffect(() => this.actions$.pipe(
        ofType(startSynchingRequests),
        concatLatestFrom(() => this.store.select((state: AppState) => state.offline.requests)),
        map(([a, data]) => {;
            return data;
        }),
        mergeAll(),
        switchMap((request: OfflineRequest) => {
            return this.offlineService.resendRequest(request.request).pipe(
                tap(() => this.store.dispatch(removeOfflineRequest({ id: request.id })))
            )
        }),
        map(() => synchingFinished())
    ));

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private offlineService: OfflineService,
    ) { }
}