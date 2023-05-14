import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import {
  loginSuccessAction,
  loginAction,
  loginFailureAction,
} from 'src/app/auth/store/actions/login.action';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: ICurrentUser) => {
            console.log('currentUser', currentUser);
            this.persistanService.set('accessToken', currentUser.accessToken);
            return loginSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('errorResponse', errorResponse);
            this.message.error('Ошибка!');
            this.message.error('Бақылау тізімін алу мүмкін болмады!');
            this.message.error(
              'Әрекетті кейінірек қайталаңыз немесе мәселе шешілмесе, қолдау қызметіне хабарласыңыз.'
            );
            return of(loginFailureAction({ errors: errorResponse.error }));
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
    private persistanService: PersistanceService
  ) {}
}
