import { createReducer, on, Action } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { IArticleState } from 'src/app/article/types/articleState.interface';
import {
  getArticleAction,
  getArticleSuccessAction,
  getArticleFailureAction,
} from 'src/app/article/store/actions/getArticle.action';

const initialState: IArticleState = {
  data: null,
  isLoading: false,
  error: null,
};

const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): IArticleState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): IArticleState => ({
      ...state,
      isLoading: false,
      data: action.article,
    })
  ),
  on(
    getArticleFailureAction,
    (state): IArticleState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): IArticleState => initialState)
);

export function reducers(state: IArticleState, action: Action) {
  return articleReducer(state, action);
}
