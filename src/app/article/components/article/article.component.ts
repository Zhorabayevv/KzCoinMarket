import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getArticleAction } from 'src/app/article/store/actions/getArticle.action';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from 'src/app/shared/types/article.interface';
import { Subscription, Observable, combineLatest } from 'rxjs';
import {
  articleSelector,
  isLoadingSelector,
  errorSelector,
} from 'src/app/article/store/selectors';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { map } from 'rxjs/operators';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { deleteArticleAction } from 'src/app/article/store/actions/deleteArticle.action';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;
  article: IArticle;
  articleSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  quantity: number = 1;
  tenge: number = 10835847.6;

  links = [
    {
      icon: 'link',
      name: '.org',
      link: 'https://bitcoin.org/ru/',
    },
    {
      icon: 'search',
      name: 'Explorers',
      link: 'https://www.blockchain.com/explorer',
    },
    {
      icon: 'user',
      name: 'Community',
      link: 'https://www.blockchain.com/explorer',
    },
    {
      icon: 'code',
      name: 'Source code',
      link: 'https://github.com/bitcoin/bitcoin',
    },
    {
      icon: 'file-text',
      name: 'Whitepaper',
      link: 'https://www.blockchain.com/explorer',
    },
  ];

  coinsTr = [
    {
      id: '1',
      coinName: 'Bitcoin',
      coinSymbol: 'BTC',
      coinIcon: 'btc',
      hRate: 0.14,
      dRate: 0.8,
      wRate: 1.37,
      price: 12708676.94,
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
      price: 805042.96,
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
      price: 457.84,
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
      price: 149576.33,
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
      price: 457.43,
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
      price: 203.01,
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
      price: 161.53,
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
      price: 2742.46,
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
      price: 9532.23,
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
      price: 7801.59,
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
      price: 0.0,
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
      price: 0.0,
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
      price: 0.0,
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
      price: 0.0,
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
      price: 0.0,
      marketCapValue: '0.00',
      volumeCryptoValue: '0.00',
      volumeValue: '0.00',
      procent: 59,
      circulatingSupply: '0.00',
      grap: 7653,
      isFavorited: false,
    },
  ];
  actRoute: string;
  coin = this.coinsTr[0];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
    this.findCoin();
    this.actRoute = this.router.url;
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest(
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(([article, currentUser]: [IArticle | null, ICurrentUser | null]) => {
        if (!article || !currentUser) {
          return false;
        }
        return currentUser.username === article.author.username;
      })
    );
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: IArticle | null) => {
        this.article = article;
      });
  }

  findCoin(): void {
    this.coin = this.coinsTr.find(
      (coin) => coin.coinSymbol === this.route.params['_value']['symbol']
    );
    console.log(this.coin);
  }

  quantityInput(): void {
    this.tenge = this.quantity * this.coin.price;
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }
}
