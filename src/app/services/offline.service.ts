import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { addOfflineRequest } from "../redux/offline/offline.actions";
import { OfflineRequest } from "../redux/offline/offline.model";
import { OfflineError } from "./offline.error";

@Injectable({ providedIn: "root" })
export class OfflineService {
  constructor(private http: HttpClient, private store: Store) {}

  handleOfflineError<Type>(
    error: Error,
    args: { defaultValue: Type }
  ): Observable<Type> {
    if (error instanceof OfflineError) {
      const request: HttpRequest<any> = error.req;
      // we don't store GET Requests, as they contain no significant change for the system
      if (request.method !== "GET") {
        const offlineRequest: OfflineRequest = {
          id: (args?.defaultValue as any)?.id,
          request,
        };
        this.store.dispatch(addOfflineRequest({ request: offlineRequest }));
      }
      return of(args?.defaultValue);
    }
    throw error;
  }

  resendRequest(req: HttpRequest<any>): Observable<any> {
    return this.http.request(req.method, req.url, {
      headers: req.headers,
      body: req.body,
    });
  }
}
