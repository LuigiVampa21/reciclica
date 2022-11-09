import { createAction, props } from '@ngrx/store';
import { UserRegister } from '../../models/user.model';

export const register = createAction('[Register', props<{user: UserRegister}>());
export const registerSuccess = createAction('[Register] success');
export const registerFail = createAction('[Register] fail', props<{error: any}>());
