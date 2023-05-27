export interface ICoinsTr {
  id: string;
  fullName: string;
  symbol: string;
  logoUrl: string;
  price: string;
  marketCapValue: string;
  volumeCryptoValue: string;
  volumeValue: string;
  percent?: string;
  grap: number;
  circulatingSupply: string;
  priceUsd: string;
  priceKzt: string;
  isLiked: boolean | null;
  hrate: number;
  drate: number;
  wrate: number;
}
