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
  coinsTr = [
    {
      id: '1',
      coinName: 'Bitcoin',
      coinSymbol: 'BTC',
      coinIcon: 'btc',
      hRate: 0.14,
      dRate: 0.8,
      wRate: 1.37,
      price: '12,708,676.94',
      marketCapValue: '245,646,563.04',
      volumeCryptoValue: '11,555,706,337,542.00',
      volumeValue: '1,087,572.00',
      procent: 90,
      circulatingSupply: '19,280,993',
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
      price: '805,042.96',
      marketCapValue: '98,516,219.31',
      volumeCryptoValue: '34,744,087,890,190.00',
      volumeValue: '4,612,291',
      circulatingSupply: '122,373,866',
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
      marketCapValue: '36,179,566.01',
      volumeCryptoValue: '15,921,168,825,109.90',
      volumeValue: '34,989,125,924',
      circulatingSupply: '68,028,597,304.00',
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
      price: '149,576.33',
      marketCapValue: '26,616,540.00',
      volumeCryptoValue: '358,173,896,888.79',
      volumeValue: '2,398,198',
      procent: 85,
      circulatingSupply: '157,900,834',
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
      marketCapValue: '16,767,168.12',
      volumeCryptoValue: '1,478,168,329,942.12',
      volumeValue: '3,248,829,087',
      circulatingSupply: '41,962,698,965',
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
      marketCapValue: '10,343,544.83',
      volumeCryptoValue: '356,602,435,213,65',
      volumeValue: '1,915,403,030',
      procent: 78,
      circulatingSupply: '50,799,084,881',
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
      marketCapValue: '5,610,101.05',
      volumeCryptoValue: '164,859,074,972,56',
      volumeValue: '904,096,088',
      procent: 89,
      circulatingSupply: '34,609,713,922',
      grap: 16,
      isFavorited: false,
    },
    {
      id: '8',
      coinName: 'Polygon',
      coinSymbol: 'MATIC',
      coinIcon: 'matic',
      hRate: 3.3,
      dRate: 0.5,
      wRate: 1.26,
      price: '559.64',
      marketCapValue: '3,210,220.95',
      volumeCryptoValue: '262,947,701,210.79',
      volumeValue: '557,331,234',
      procent: 83,
      circulatingSupply: '8,734,317,475',
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
      volumeCryptoValue: '262,947,701,210.79',
      volumeValue: '23,602,122',
      procent: 57,
      circulatingSupply: '372,568,472',
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
      coinName: 'Avalanche',
      coinSymbol: 'AVAX',
      coinIcon: 'avalanche',
      hRate: 0.14,
      dRate: 0.21,
      wRate: 11.46,
      price: '7801.59',
      marketCapValue: '3080633.59',
      volumeCryptoValue: '194,928,094,525,14',
      volumeValue: '20,212,297',
      procent: 63,
      circulatingSupply: '315,039,856',
      grap: 10,
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
