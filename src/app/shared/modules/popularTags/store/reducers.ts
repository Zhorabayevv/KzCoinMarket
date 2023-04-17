import { Action, createReducer, on } from "@ngrx/store";

import { IPopularTagsState } from "src/app/shared/modules/popularTags/types/popularTagsState.interface";
import { getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction } from "src/app/shared/modules/popularTags/store/actions/getPopularTags.action";

const initialState: IPopularTagsState = {
  data: null,
  isLoading: false,
  error: null
}

const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): IPopularTagsState => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getPopularTagsSuccessAction,
  (state, action): IPopularTagsState =>({
    ...state,
    isLoading: false,
    data: action.popularTags
  })
  ),
  on(
    getPopularTagsFailureAction,
    (state): IPopularTagsState => ({
      ...state,
      isLoading: false
    })
  )
)

export function reducers(state: IPopularTagsState, action: Action) {
  return popularTagsReducer(state, action);
}
