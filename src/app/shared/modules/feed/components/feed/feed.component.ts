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
import { TranslateService } from '@ngx-translate/core';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';

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
  isLoggedIn$: Observable<boolean>;
  limitArticles = 10;
  baseUrl: string;
  queryParamsSubscription: Subscription;
  currentPage: number;
  spinning: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.initializeListeners();
  }
  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
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
    const page = this.currentPage;
    const parsedUrl = queryString.parseUrl(this.apiUrlProps);
    const stringifiedParams = queryString.stringify({
      limit: this.limitArticles,
      page,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }

  addFavorite(id: string, isFavorited: boolean): void {
    this.store.dispatch(addToFavoritesAction({ id, isFavorited }));
  }
}
