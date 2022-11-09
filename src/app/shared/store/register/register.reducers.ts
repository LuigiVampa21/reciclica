/* eslint-disable arrow-body-style */
import { register, registerFail, registerSuccess } from './register.actions';
import { RegisterState } from './RegisterState';
import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';

const initialState = AppInitialState.register;

const reducer = createReducer(initialState,
  on(register, currentState => {
    return {
      ...currentState,
      error: null,
      isRegistered: false,
      isRegistering: true,
    };
  }),
  on(registerSuccess, currentState => {
    return {
      ...currentState,
      error: null,
      isRegistered: true,
      isRegistering: false,
    };
  }),
  on(registerFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isRegistered: false,
      isRegistering: false,
    };
  }
));
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function registerReducer(state: RegisterState, action){
  return reducer(state, action);
}
