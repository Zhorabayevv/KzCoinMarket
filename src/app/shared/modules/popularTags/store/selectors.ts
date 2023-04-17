import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/shared/types/appState.interface';
import { IPopularTagsState } from '../types/popularTagsState.interface';

export const popularTagsFeatureSelector = (state: IAppState): IPopularTagsState => state.popularTags;

export const isLoadingSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: IPopularTagsState) => popularTagsState.isLoading
);

export const errorSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: IPopularTagsState) => popularTagsState.error
);

export const popularTagsSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: IPopularTagsState) => popularTagsState.data
);
