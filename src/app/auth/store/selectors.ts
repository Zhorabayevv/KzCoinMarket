import { createSelector  } from "@ngrx/store";

import { IAuthState } from 'src/app/auth/types/authState.interface';
import { IAppState } from 'src/app/shared/types/appState.interface';

export const authFeatureSelector = (
  state: IAppState
): IAuthState => state.auth;


export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.validationErrors
);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isLoggedIn
);

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.currentUser
);

export const modalSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.modal
);
