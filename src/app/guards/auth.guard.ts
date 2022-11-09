import { switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../shared/store/AppState';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor(private store: Store<AppState>){ }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('login')
        .pipe(
          take(1),
          switchMap(loginState => {
            return of(loginState.isLoggedIn)
          })
        );
  }
}
