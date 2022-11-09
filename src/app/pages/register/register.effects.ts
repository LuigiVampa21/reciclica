/* eslint-disable */
import { UserRegister } from './../../shared/models/user.model';
import { registerSuccess, registerFail, register } from './../../shared/store/register/register.actions';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()

export class RegisterEffects{

  constructor(private actions$: Actions, private authService: AuthService){ }

  register$ = createEffect(() => this.actions$
          .pipe(
            ofType(register),
            switchMap((payload: {user: UserRegister}) => this.authService.onRegister(payload.user)
              .pipe(
                map((user) => registerSuccess()),
                catchError(error => of(registerFail({error})))
              ))
          ))
}
