import { recoverPasswordFail } from './../../shared/store/login/login.actions';
/* eslint-disable */
import { AuthService } from 'src/app/services/auth.service';
import { recoverPassword, recoverPasswordSuccess } from './../../shared/store/login/login.actions';
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
}
