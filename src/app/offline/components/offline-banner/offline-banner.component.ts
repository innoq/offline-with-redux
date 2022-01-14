import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/app.model';
import { OnlineStatus } from 'src/app/redux/offline/offline.model';

@Component({
  selector: 'app-offline-banner',
  templateUrl: './offline-banner.component.html',
  styleUrls: ['./offline-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfflineBannerComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  offline$!: Observable<OnlineStatus>;
  OFFLINE: OnlineStatus = OnlineStatus.OFFLINE;

  ngOnInit(): void {
    this.offline$ = this.store.select((state: AppState) => state.offline.onlineStatus);
  }

}
