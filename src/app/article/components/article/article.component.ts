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

  actRoute: string;

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
    this.actRoute = this.router.url;
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('symbol');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    // this.isAuthor$ = combineLatest([
    //   this.store.pipe(select(articleSelector)),
    //   this.store.pipe(select(currentUserSelector)),
    // ]).pipe(
      // map(
        // ([article, currentUser]) =>!!article &&!!currentUser &&
          // currentUser.username === article.author.username
      // )
    // );
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: IArticle | null) => {
        console.log(article);
        this.article = article;
      });
  }


  quantityInput(): void {
    this.tenge = this.quantity * this.article.priceUsdNumber;
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }
}
