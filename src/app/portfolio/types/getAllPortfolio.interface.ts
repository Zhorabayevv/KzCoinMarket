import { IWalletModel } from './walletModel.interface';

export interface IGetAllProtfolio {
  count: number;
  walletModel: IWalletModel[];
}
