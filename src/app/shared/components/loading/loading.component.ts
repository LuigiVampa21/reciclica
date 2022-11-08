import { AppState } from './../../store/loading/AppState';
import { LoadingState } from './../../store/loading/LoadingState';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  loadingState$: Observable<LoadingState>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.loadingState$ = this.store.select('loading');
  }
}
