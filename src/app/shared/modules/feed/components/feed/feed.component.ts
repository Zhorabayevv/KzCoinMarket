import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import queryString from 'query-string';

import {
  addToFavoritesAction,
  getFeedAction,
} from 'src/app/shared/modules/feed/store/actions/getFeed.action';
import { IGetFeedResponse } from 'src/app/shared/modules/feed/types/getFeedResponse.interface';
import {
  isLoadingSelector,
  errorSelector,
  feedSelector,
} from 'src/app/shared/modules/feed/store/selectors';
import { ICoinsTr } from 'src/app/shared/modules/feed/types/coinsTr.interface';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input('apiUrl') apiUrlProps: string;
  @Input('watchList') watchListProps: boolean;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<IGetFeedResponse | null>;
  limitArticles = 10;
  baseUrl: string;
  queryParamsSubscription: Subscription;
  currentPage: number;
  coinsTr: ICoinsTr[] = [
    {
      id: '1',
      coinName: 'Bitcoin',
      coinSymbol: 'BTC',
      coinIcon: 'btc',
      hRate: 0.14,
      dRate: 0.8,
      wRate: 1.37,
      price: '12708676.94',
      marketCapValue: '245646563.04',
      volumeCryptoValue: '168.00',
      volumeValue: '13293.58',
      procent: 90,
      circulatingSupply: '4.00',
      grap: 1,
      isFavorited: false,
    },
    {
      id: '2',
      coinName: 'Ethereum',
      coinSymbol: 'ETH',
      coinIcon: 'eth',
      hRate: 0.28,
      dRate: 0.61,
      wRate: 3.68,
      price: '805042.96',
      marketCapValue: '98516219.31',
      volumeCryptoValue: '4.00',
      volumeValue: '3393.58',
      procent: 70,
      circulatingSupply: '6.00',
      grap: 2,
      isFavorited: false,
    },
    {
      id: '3',
      coinName: 'Tether',
      coinSymbol: 'USDT',
      coinIcon: 'usdt',
      hRate: 0.0,
      dRate: 0.02,
      wRate: 0.01,
      price: '457.84',
      marketCapValue: '36179566.01',
      volumeCryptoValue: '4.00',
      volumeValue: '2243.23',
      circulatingSupply: '6.00',
      grap: 3,
      isFavorited: false,
    },
    {
      id: '4',
      coinName: 'BNB',
      coinSymbol: 'BNB',
      coinIcon: 'bnb',
      hRate: 0.14,
      dRate: 1.23,
      wRate: 6.05,
      price: '149576.33',
      marketCapValue: '26616540.00',
      volumeCryptoValue: '4.00',
      volumeValue: '2115.46',
      procent: 85,
      circulatingSupply: '6.00',
      grap: 4,
      isFavorited: false,
    },
    {
      id: '5',
      coinName: 'USD Coin',
      coinSymbol: 'USDC',
      coinIcon: 'usdc',
      hRate: 0.01,
      dRate: 0.0,
      wRate: 0.02,
      price: '457.43',
      marketCapValue: '15503278.51',
      volumeCryptoValue: '3.00',
      volumeValue: '1893.34',
      circulatingSupply: '1.00',
      grap: 5,
      isFavorited: false,
    },
    {
      id: '6',
      coinName: 'XRP',
      coinSymbol: 'XRP',
      coinIcon: 'xrp',
      hRate: 0.18,
      dRate: 0.35,
      wRate: 1.81,
      price: '203.01',
      marketCapValue: '10343544.83',
      volumeCryptoValue: '3.00',
      volumeValue: '1694.63',
      procent: 78,
      circulatingSupply: '1.00',
      grap: 6,
      isFavorited: false,
    },
    {
      id: '7',
      coinName: 'Cardano',
      coinSymbol: 'ADA',
      coinIcon: 'cardano',
      hRate: 6.32,
      dRate: 5.06,
      wRate: 3.39,
      price: '161.53',
      marketCapValue: '5610101.05',
      volumeCryptoValue: '3.00',
      volumeValue: '991.48',
      procent: 89,
      circulatingSupply: '1.00',
      grap: 16,
      isFavorited: false,
    },
    {
      id: '8',
      coinName: 'Terra',
      coinSymbol: 'LUNC',
      coinIcon: 'tera',
      hRate: 3.3,
      dRate: 0.5,
      wRate: 1.26,
      price: '2742.46',
      marketCapValue: '3210220.95',
      volumeCryptoValue: '4.00',
      volumeValue: '723.98',
      procent: 83,
      circulatingSupply: '6.00',
      grap: 8,
      isFavorited: false,
    },
    {
      id: '9',
      coinName: 'Solana',
      coinSymbol: 'SOL',
      coinIcon: 'solana',
      hRate: 0.69,
      dRate: 11.45,
      wRate: 15.32,
      price: '9532.23',
      marketCapValue: '3659426.92',
      volumeCryptoValue: '3.00',
      volumeValue: '693.58',
      procent: 57,
      circulatingSupply: '1.00',
      grap: 13,
      isFavorited: false,
    },
    {
      id: '10',
      coinName: 'Avalanche',
      coinSymbol: 'AVAX',
      coinIcon: 'avalanche',
      hRate: 0.14,
      dRate: 0.21,
      wRate: 11.46,
      price: '7801.59',
      marketCapValue: '3080633.59',
      volumeCryptoValue: '4.00',
      volumeValue: '552.93',
      procent: 63,
      circulatingSupply: '6.00',
      grap: 10,
      isFavorited: false,
    },
    {
      id: '11',
      coinName: 'Bitcoin',
      coinSymbol: 'BTC',
      coinIcon: 'btc',
      hRate: 0.42,
      dRate: 0.21,
      wRate: 2.23,
      price: '0.00',
      marketCapValue: '0.00',
      volumeCryptoValue: '0.00',
      volumeValue: '0.00',
      procent: 51,
      circulatingSupply: '0.00',
      grap: 328,
      isFavorited: false,
    },
    {
      id: '12',
      coinName: 'Bitcoin',
      coinSymbol: 'BTC',
      coinIcon: 'btc',
      hRate: 0.69,
      dRate: 0.26,
      wRate: 4.27,
      price: '0.00',
      marketCapValue: '0.00',
      volumeCryptoValue: '0.00',
      volumeValue: '0.00',
      procent: 71,
      circulatingSupply: '0.00',
      grap: 7628,
      isFavorited: false,
    },
    {
      id: '13',
      coinName: 'Bitcoin',
      coinSymbol: 'BTC',
      coinIcon: 'btc',
      hRate: 1.7,
      dRate: 0.56,
      wRate: 1.37,
      price: '0.00',
      marketCapValue: '0.00',
      volumeCryptoValue: '0.00',
      volumeValue: '0.00',
      procent: 76,
      circulatingSupply: '0.00',
      grap: 2100,
      isFavorited: false,
    },
    {
      id: '14',
      coinName: 'Bitcoin',
      coinSymbol: 'BTC',
      coinIcon: 'btc',
      hRate: 0.13,
      dRate: 0.21,
      wRate: 1.46,
      price: '0.00',
      marketCapValue: '0.00',
      volumeCryptoValue: '0.00',
      volumeValue: '0.00',
      procent: 84,
      circulatingSupply: '0.00',
      grap: 2099,
      isFavorited: false,
    },
    {
      id: '15',
      coinName: 'Bitcoin',
      coinSymbol: 'BTC',
      coinIcon: 'btc',
      hRate: 0.42,
      dRate: 0.16,
      wRate: 2.23,
      price: '0.00',
      marketCapValue: '0.00',
      volumeCryptoValue: '0.00',
      volumeValue: '0.00',
      procent: 59,
      circulatingSupply: '0.00',
      grap: 7653,
      isFavorited: false,
    },
  ];

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.initializeListeners();
    console.log('this.watchListProps', this.watchListProps);
  }
  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeeds();
      }
    );
  }

  fetchFeeds(): void {
    const offset = this.currentPage * this.limitArticles - this.limitArticles;
    const parsedUrl = queryString.parseUrl(this.apiUrlProps);
    const stringifiedParams = queryString.stringify({
      limit: this.limitArticles,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    console.log(apiUrlWithParams);

    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }

  addFavorite(id: string, isFavorited: boolean): void {
    this.store.dispatch(addToFavoritesAction({ id, isFavorited }));
  }
}
