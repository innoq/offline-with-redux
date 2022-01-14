import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, first, flatMap, map, switchMap } from 'rxjs/operators';
import { AppState } from './redux/app.model';
import { OnlineStatus } from './redux/offline/offline.model';
import { OfflineError } from './services/offline.error';

/**
 * Error Interceptor: Checks if request errors occur because we're offline
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select((state: AppState) => state.offline.onlineStatus).pipe(
            first(),
            switchMap((status: OnlineStatus) => {
                return next.handle(req).pipe(
                    catchError((e: HttpErrorResponse) => {
                        if (status === OnlineStatus.OFFLINE) {
                            const offlineError = new OfflineError('offline');
                            offlineError.req = req;
                            return throwError(() => offlineError);
                        } else {
                            return throwError(() => e);
                        }
                    })
                )
            })
        )
    }

}
