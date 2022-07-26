import { HttpRequest } from "@angular/common/http";

export enum OnlineStatus {
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
}

export interface OfflineRequest {
  id: string;
  request: HttpRequest<any>;
}

export interface OfflineState {
  onlineStatus: OnlineStatus;
  requests: readonly OfflineRequest[];
}
