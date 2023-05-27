import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import {
  currentUserSelector,
  isLoggedInSelector,
} from 'src/app/auth/store/selectors';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { ISelect } from '../types/select.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LoginComponent } from 'src/app/auth/components/login/login.component';

@Component({
  selector: 'mc-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<ICurrentUser | null>;
  selectedCurrency: string = 'USD';
  selectedLanguage: string = 'kz';
  languageOptions: ISelect[] = [
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
  currencyOptions: ISelect[] = [
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
  searchOptions = [
    { img: 'btc', title: 'Bitcoin', symbol: 'BTC', number: 1 },
    { img: 'eth', title: 'Ethereum', symbol: 'ETH', number: 2 },
    { img: 'xrp', title: 'Ripple', symbol: 'XRP', number: 3 },
    { img: 'iota', title: 'IOTA', symbol: 'MIOTA', number: 4 },
    { img: 'solana', title: 'Solana', symbol: 'SOL', number: 5 },
    { img: 'cardano', title: 'Cardano', symbol: 'ADA', number: 6 },
  ];

  constructor(
    private store: Store,
    private modal: NzModalService,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('kz');
    this.selectedLanguage = this.translate.defaultLang;
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }

  signIn(sign: string): void {
    this.modal.create({
      nzContent: LoginComponent,
      nzComponentParams: {
        sign: sign,
      },
      nzWidth: 496,
      nzFooter: null,
    });
  }
  changeLanguage(lang: string) {
    console.log(lang);
    this.translate.use(lang);
    this.selectedLanguage = lang;
  }

  signout(): void {
    // this.store.dispatch(logoutAction());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  }
}
