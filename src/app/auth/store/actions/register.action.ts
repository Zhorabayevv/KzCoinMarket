import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { IRegisterRequest } from 'src/app/auth/types/registerRequest.interface';
import { IBackendErrors } from 'src/app/shared/types/backendErrors.interface';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: IRegisterRequest }>()
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ message: string }>()
);

export const registerFailedAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ errors: IBackendErrors }>()
);
