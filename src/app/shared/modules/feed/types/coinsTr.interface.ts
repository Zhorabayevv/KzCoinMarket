export interface ICoinsTr {
  id: string;
  coinName: string;
  coinSymbol: string;
  coinIcon: string;
  hRate: number;
  dRate: number;
  wRate: number;
  price: string;
  marketCapValue: string;
  volumeCryptoValue: string;
  volumeValue: string;
  procent?: number;
  circulatingSupply: string;
  grap: number;
  isFavorited: boolean;
}
