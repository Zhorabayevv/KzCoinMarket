import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { PopularTagsService } from '../../services/popularTags.service';
import { getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction } from '../actions/getPopularTags.action';

@Injectable()
export class GetPopularTagsEffect {
  getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: string[]) => {
            return getPopularTagsSuccessAction({ popularTags });
          }),
          catchError(() => {
            return of(
              getPopularTagsFailureAction()
            );
          })
        );
      })
    )
  );


  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ){}
}
