import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/shared/modules/popularTags/store/actionTypes";

export const getPopularTagsAction = createAction(
  ActionTypes.GET_POPULAR_TAGS
);
export const getPopularTagsSuccessAction = createAction(
  ActionTypes.GET_POPULAR_TAGS_SUCCESS,
  props<{ popularTags: string[] }>()
);

export const getPopularTagsFailureAction = createAction(
  ActionTypes.GET_POPULAR_TAGS_FAILURE
);
