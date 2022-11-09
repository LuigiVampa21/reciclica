/* eslint-disable @typescript-eslint/naming-convention */
import { LoginEffects } from './../../pages/login/login.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './loading/loading.reducers';
import { loginReducer } from './login/login.reducers';
import { registerReducer } from './register/register.reducers';
import { RegisterEffects } from 'src/app/pages/register/register.effects';


export const AppStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature('loading', loadingReducer),
  StoreModule.forFeature('login', loginReducer),
  StoreModule.forFeature('register', registerReducer),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([
    LoginEffects,
    RegisterEffects,
  ])
];
