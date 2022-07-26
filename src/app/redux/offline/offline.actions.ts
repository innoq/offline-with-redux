import { createAction, props } from "@ngrx/store";
import { OfflineRequest } from "./offline.model";

export const changeToOffline = createAction("[Offline] Change to offline");
export const changeToOnline = createAction("[Offline] Change to online");
export const startSynchingRequests = createAction(
  "[Offline] Start synching requests"
);
export const synchingFinished = createAction(
  "[Offline] Synching requests finished"
);
export const addOfflineRequest = createAction(
  "[Offline] Add offline request",
  props<{ request: OfflineRequest }>()
);
export const removeOfflineRequest = createAction(
  "[Offline] Remove offline request",
  props<{ id: string }>()
);
