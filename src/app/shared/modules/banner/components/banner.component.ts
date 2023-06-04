import { Component, OnInit } from '@angular/core';

import { IBanners } from 'src/app/shared/modules/banner//types/banners.interface';
import { IBannerCarousel } from 'src/app/shared/modules/banner//types/bannerCarousel.interface';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

@Component({
  selector: 'mc-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  banners: IBanners[] = [
    {
      title: 'trending',
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
      title: 'kz_cryptocurrencies',
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
      title: 'community_article',
      image: '',
    },
  ];

  carousel: IBannerCarousel[] = [
    {
      title: 'kazakhstan',
      image: '../../../../../assets/news.svg',
      logo: '../../../../../assets/btc.png',
      desc: 'kazakhdesc',
      date: 'sep30',
      watch: 998,
      like: 4,
    },
    {
      title: 'earth',
      image: '../../../../../assets/news.svg',
      logo: '../../../../../assets/eth.png',
      desc: 'earthdesc',
      date: 'aug8',
      watch: 238,
      like: 2,
    },
    {
      title: 'kazakhstan',
      image: '../../../../../assets/news.svg',
      logo: '../../../../../assets/shiba.png',
      desc: 'earthdesc',
      date: 'mar8',
      watch: 233,
      like: 3,
    },
    {
      title: 'earth',
      image: '../../../../../assets/news.svg',
      logo: '../../../../../assets/xrp.png',
      desc: 'earthdesc',
      date: 'feb2',
      watch: 237,
      like: 5,
    },
  ];
  lang: string = 'en';
  currency: string = 'USD';
  darkMode: boolean;

  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    this.lang = localStorage.getItem('lang') || 'kz';
    this.currency = localStorage.getItem('currency') || 'KZT';
  }
  ngOnInit(): void {
    this.localStorageService.getDarkMode().subscribe((value: boolean) => {
      this.darkMode = value;
      console.log(this.darkMode);
    });

    this.localStorageService.getCurrency().subscribe((value: string) => {
      this.currency = value;
    });
  }
}
