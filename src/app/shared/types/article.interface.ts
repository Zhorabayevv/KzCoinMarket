export interface IArticle {
  circulatingSupply: string;
  description: string | null;
  drate: number;
  fullName: string;
  hrate: number;
  id: string;
  isLiked: boolean | null;
  logoUrl: string;
  marketCapValue: string;
  marketCapValueNumber: string;
  percent: number;
  priceKzt: string;
  priceUsd: string;
  symbol: string;
  priceUsdNumber: number;
  volumeCryptoValue: string;
  volumeValue: string;
  wrate: number;
  low24Hour: string;
  high24Hour: string;
}
