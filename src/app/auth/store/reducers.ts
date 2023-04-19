import { getCurrentUserFailureAction } from './actions/getCurrentUser.action';
import { Action, createReducer, on } from '@ngrx/store';

import { IAuthState } from 'src/app/auth/types/authState.interface';
import { registerAction, registerFailedAction, registerSuccessAction } from 'src/app/auth/store/actions/register.action';
import { loginAction, loginSuccessAction } from 'src/app/auth/store/actions/login.action';
import { getCurrentUserAction, getCurrentUserSuccessAction } from 'src/app/auth/store/actions/getCurrentUser.action';
import { loginFailureAction } from 'src/app/auth/store/actions/login.action';

const initialState: IAuthState = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
  isLoading: false,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      currentUser: null,
    })
  ),
  on(
    registerFailedAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    loginAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    loginFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    getCurrentUserAction, (state): IAuthState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction, (state, action): IAuthState => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    currentUser: action.currentUser
    })
  ),
  on(
    getCurrentUserFailureAction, (state): IAuthState => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    currentUser: null
    })
  )
);

export function reducers(state: IAuthState, action: Action) {
  return authReducer(state, action);
}
