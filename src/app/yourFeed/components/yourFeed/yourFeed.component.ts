import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import {
  currentUserSelector,
  isLoggedInSelector,
} from 'src/app/auth/store/selectors';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'mc-your-feed',
  templateUrl: './yourFeed.component.html',
  styleUrls: ['./yourFeed.component.scss'],
})
export class YourFeedComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<ICurrentUser | null>;
  apiUrl: string = '/coin/user/liked';
  watchList: boolean = true;
  darkMode: boolean;
  currency: string;

  constructor(
    public translate: TranslateService,
    private store: Store,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.localStorageService.getDarkMode().subscribe((value: boolean) => {
      this.darkMode = value;
      console.log(this.darkMode);
    });

    this.localStorageService.getCurrency().subscribe((value: string) => {
      this.currency = value;
    });
    // this.currentUser$.subscribe((data) => {
    //   if (data) {
    //     console.log(data);
    //     this.apiUrl = `/coin/user/liked`;
    //   }
    // });
  }
}
