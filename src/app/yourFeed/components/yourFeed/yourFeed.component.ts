import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { currentUserSelector, isLoggedInSelector } from 'src/app/auth/store/selectors';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'mc-your-feed',
  templateUrl: './yourFeed.component.html',
  styleUrls: ['./yourFeed.component.scss'],
})
export class YourFeedComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<ICurrentUser | null>;
  apiUrl: string = '/user/watchlist';
  watchList: boolean = true;

  constructor(public translate: TranslateService, private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.currentUser$.subscribe((data) => {
      if (data) {
        console.log(data);
        this.apiUrl = `/user/watchlist/${data.id}`;
      }
    });
  }
}
