import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import queryString from 'query-string';

import { getFeedAction } from 'src/app/shared/modules/feed/store/actions/getFeed.action';
import { IGetFeedResponse } from 'src/app/shared/modules/feed/types/getFeedResponse.interface';
import { isLoadingSelector, errorSelector, feedSelector } from 'src/app/shared/modules/feed/store/selectors';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy{
  @Input('apiUrl') apiUrlProps: string;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<IGetFeedResponse | null>;
  limitArticles = 10;
  baseUrl: string;
  queryParamsSubscription: Subscription;
  currentPage: number;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.initializeValues();
    this.initializeListeners();
    console.log(this.isLoading$);

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
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
    this.currentPage = Number(params['page'] || '1');
    this.fetchFeeds();
    });
  }

  fetchFeeds(): void {
    const offset = this.currentPage * this.limitArticles - this.limitArticles;
    const parsedUrl = queryString.parseUrl(this.apiUrlProps);
    const stringifiedParams = queryString.stringify({
      limit: this.limitArticles,
      offset,
      ...parsedUrl.query
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    console.log(apiUrlWithParams);


    this.store.dispatch(getFeedAction({url: apiUrlWithParams}));
  }
}
