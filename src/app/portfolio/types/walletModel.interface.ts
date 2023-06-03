import { IGetFeedResponse } from "src/app/shared/modules/feed/types/getFeedResponse.interface";

export interface IWalletModel {
  amount: number;
  coins: IGetFeedResponse;
  id: number;
  name: string;
  fullPrice: number;
  userId: number;
}
