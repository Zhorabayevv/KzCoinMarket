import { createAction, props } from "@ngrx/store";

import { ActionTypes } from 'src/app/shared/modules/feed/store/actionTypes';
import { IGetFeedResponse } from 'src/app/shared/modules/feed/types/getFeedResponse.interface';

export const getFeedAction = createAction(
  ActionTypes.GET_FEED,
  props<{ url: string }>()
);

export const getFeedSuccessAction = createAction(
  ActionTypes.GET_FEED_SUCCESS,
  props<{ feed: IGetFeedResponse }>()
);

export const getFeedFailureAction = createAction(
  ActionTypes.GET_FEED_FAILURE
);

export const addToFavoritesAction = createAction(
  ActionTypes.ADD_TO_FAVORITES,
  props<{ isFavorited: boolean; id: string }>()
);
