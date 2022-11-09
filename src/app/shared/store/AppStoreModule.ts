/* eslint-disable @typescript-eslint/naming-convention */
import { LoginEffects } from './../../pages/login/login.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './loading/loading.reducers';
import { loginReducer } from './login/login.reducers';


export const AppStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature('loading', loadingReducer),
  StoreModule.forFeature('login', loginReducer),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([
    LoginEffects
  ])
];
