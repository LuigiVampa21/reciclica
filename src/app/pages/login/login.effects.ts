/* eslint-disable */
import { loginSuccess, loginFail } from './../../shared/store/login/login.actions';
import { AuthService } from 'src/app/services/auth.service';
import { recoverPassword, recoverPasswordSuccess, login, recoverPasswordFail } from './../../shared/store/login/login.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()

export class LoginEffects{

  constructor(private actions$: Actions, private authService: AuthService){ }

  recoverPassword$ = createEffect(() => this.actions$
        .pipe(
          ofType(recoverPassword),
          switchMap((payload: {email: string}) => this.authService.recoverEmailPassword(payload.email)
            .pipe(
              map(() => recoverPasswordSuccess()),
              catchError(error => of(recoverPasswordFail({error})))
            ))
       ))

  login$ = createEffect(() => this.actions$
          .pipe(
            ofType(login),
            switchMap((payload: {email: string, password: string}) => this.authService.onLogin(payload.email, payload.password)
              .pipe(
                map((user) => loginSuccess({user})),
                catchError(error => of(loginFail({error})))
              ))
          ))
}
