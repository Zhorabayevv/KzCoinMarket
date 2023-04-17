import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  currentUserSelector,
  isLoggedInSelector,
} from 'src/app/auth/store/selectors';

import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { ISelect } from '../types/select.interface';

@Component({
  selector: 'mc-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<ICurrentUser | null>;
  selectedCurrency = 'USD';
  selectedLanguage = 'kz';
  LanguageOptions: ISelect[] = [
    {
      value: 'kz',
      label: 'Қазақ',
    },
    {
      value: 'ru',
      label: 'Русский',
    },
    {
      value: 'en',
      label: 'English',
    },
  ];
  CurrencyOptions: ISelect[] = [
    {
      value: 'USD',
      label: 'USD',
    },
    {
      value: 'KZT',
      label: 'KZT',
    },
    {
      value: 'RUB',
      label: 'RUB',
    },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }
}
