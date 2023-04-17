import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from 'src/app/auth/store/actions/getCurrentUser.action';


@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanService.get('accessToken');
        if (!token) {
          return of(getCurrentUserFailureAction());
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: ICurrentUser) => {
            return getCurrentUserSuccessAction({ currentUser });
          }),
          catchError(() => {
            return of(
              getCurrentUserFailureAction()
            );
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanService: PersistanceService
  ) {}
}
