import { IPopularTagsState } from 'src/app/shared/modules/popularTags/types/popularTagsState.interface';
import { IFeedState } from 'src/app/shared/modules/feed/types/feedState.interface';
import { IAuthState } from "src/app/auth/types/authState.interface";

export interface IAppState {
  auth: IAuthState;
  feed: IFeedState;
  popularTags: IPopularTagsState
}
