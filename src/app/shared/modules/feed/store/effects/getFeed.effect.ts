import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { getFeedAction } from 'src/app/shared/modules/feed/store/actions/getFeed.action';
import {
  getFeedSuccessAction,
  getFeedFailureAction,
} from 'src/app/shared/modules/feed/store/actions/getFeed.action';
import { IGetFeedResponse } from 'src/app/shared/modules/feed/types/getFeedResponse.interface';
import { FeedService } from 'src/app/shared/modules/feed/services/feed.service';

@Injectable()
export class GetFeedEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: IGetFeedResponse) => {
            return getFeedSuccessAction({ feed });
          }),
          catchError(() => {
            return of(getFeedFailureAction());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private feedService: FeedService) {}
}
