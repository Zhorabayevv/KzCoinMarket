import { ICoinsTr } from './coinsTr.interface';

export interface IGetFeedResponse {
  coinDto: ICoinsTr[];
  count: number;
}
