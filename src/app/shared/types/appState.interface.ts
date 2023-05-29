import { IFeedState } from 'src/app/shared/modules/feed/types/feedState.interface';
import { IAuthState } from "src/app/auth/types/authState.interface";
import { IArticleState } from 'src/app/article/types/articleState.interface';

export interface IAppState {
  auth: IAuthState;
  feed: IFeedState;
  article: IArticleState
}
