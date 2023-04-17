import { createSelector } from '@ngrx/store';

import { IFeedState } from 'src/app/shared/modules/feed/types/feedState.interface';
import { IAppState } from 'src/app/shared/types/appState.interface';

export const feedFeatureSelector = (state: IAppState): IFeedState => state.feed;

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (feedState: IFeedState) => feedState.isLoading
);

export const errorSelector = createSelector(
  feedFeatureSelector,
  (feedState: IFeedState) => feedState.error
);

export const feedSelector = createSelector(
  feedFeatureSelector,
  (feedState: IFeedState) => feedState.data
);
