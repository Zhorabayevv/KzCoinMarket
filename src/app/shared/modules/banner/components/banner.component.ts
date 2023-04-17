import { Component, OnInit } from '@angular/core';

import { IBanners } from 'src/app/shared/modules/banner//types/banners.interface';
import { IBannerCarousel } from 'src/app/shared/modules/banner//types/bannerCarousel.interface';

@Component({
  selector: 'mc-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  banners: IBanners[] = [
    {
      title: 'Trending',
      image: '../../../../../assets/fire.png',
      coins: [
        {
          id: 1,
          title: 'Bitcoin',
          img: '../../../../../assets/btc.png',
          symbol: 'BTC',
          procent: 0.69,
        },
        {
          id: 2,
          title: 'IOTA',
          img: '../../../../../assets/iota.png',
          symbol: 'MIOTA',
          procent: 2.09,
        },
        {
          id: 3,
          title: 'Shiba Inu',
          img: '../../../../../assets/shiba.png',
          symbol: 'SHIB',
          procent: 11.87,
        },
      ],
    },
    {
      title: 'Top KZ Cryptocurrencies',
      image: '../../../../../assets/kzcoin.png',
      coins: [
        {
          id: 1,
          title: 'Digi Sign Chain',
          img: '../../../../../assets/dsc.png',
          symbol: 'DSC',
          price: 0.0013,
        },
        {
          id: 2,
          title: 'Lambda Markets',
          img: '../../../../../assets/lmda.png',
          symbol: 'LMDA',
          price: 21.17,
        },
        {
          id: 3,
          title: 'Kalima Blockchain',
          img: '../../../../../assets/kalima.png',
          symbol: 'KLX',
          price: 0.12,
        },
      ],
    },
    {
      title: 'Top Community Article',
      image: '',
    },
  ];

  carousel: IBannerCarousel[] = [
    {
      title: 'Kazakhstan',
      image: '../../../../../assets/news.svg',
      logo: '../../../../../assets/btc.png',
      desc: 'Crypto News of the Day: Judge bans SBF from encrypted messaging apps, Bithumb owner arrested in South Korea',
      date: 'Sep 30',
      watch: 998,
      like: 4,
    },
    {
      title: 'Earth',
      image: '../../../../../assets/news.svg',
      logo: '../../../../../assets/eth.png',
      desc: 'Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.',
      date: 'Aug 8',
      watch: 238,
      like: 2,
    },
    {
      title: 'Kazakhstan',
      image: '../../../../../assets/news.svg',
      logo: '../../../../../assets/shiba.png',
      desc: 'Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.',
      date: 'Mar 8',
      watch: 233,
      like: 3,
    },
    {
      title: 'Earth',
      image: '../../../../../assets/news.svg',
      logo: '../../../../../assets/xrp.png',
      desc: 'Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.',
      date: 'Feb 2',
      watch: 237,
      like: 5,
    },
  ];

  constructor() {}
  ngOnInit(): void {}
}
