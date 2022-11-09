/* eslint-disable arrow-body-style */
import { switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../shared/store/AppState';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor(private store: Store<AppState>, private router: Router){ }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('login')
        .pipe(
          take(1),
          switchMap(loginState => {
            if(loginState.isLoggedIn){
              return of(true);
            }
            this.router.navigateByUrl('login');
            return of(false);
          })
        );
  }
}
