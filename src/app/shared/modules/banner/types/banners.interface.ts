import { IBannerCoins } from './bannerCoins.interface';

export interface IBanners {
  title: string;
  image: string;
  coins?: IBannerCoins[];
}
