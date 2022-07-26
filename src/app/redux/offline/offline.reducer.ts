import { createReducer, on } from "@ngrx/store";
import {
  addOfflineRequest,
  changeToOffline,
  changeToOnline,
  removeOfflineRequest,
} from "./offline.actions";
import { OfflineState, OnlineStatus } from "./offline.model";

export const initialState: OfflineState = {
  onlineStatus: OnlineStatus.ONLINE,
  requests: [],
};

export const offlineReducer = createReducer(
  initialState,
  on(changeToOffline, (state) => ({
    ...state,
    onlineStatus: OnlineStatus.OFFLINE,
  })),
  on(changeToOnline, (state) => ({
    ...state,
    onlineStatus: OnlineStatus.ONLINE,
  })),
  on(addOfflineRequest, (state, { request }) => ({
    ...state,
    requests: state.requests.filter((r) => r.id !== request.id).concat(request),
  })),
  on(removeOfflineRequest, (state, { id }) => ({
    ...state,
    requests: state.requests.filter((r) => r.id !== id),
  }))
);
