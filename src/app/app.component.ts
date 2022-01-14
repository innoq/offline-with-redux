import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeToOffline, changeToOnline } from './redux/offline/offline.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {
    // initialise status
    const online = navigator.onLine;
    if (!online) {
      this.store.dispatch(changeToOffline());
    }

    // and then listen for changes
    window.addEventListener('online', () => this.store.dispatch(changeToOnline()));
    window.addEventListener('offline', () => this.store.dispatch(changeToOffline()));
  }
}
