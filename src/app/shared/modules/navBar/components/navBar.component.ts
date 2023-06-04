import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { Router } from '@angular/router';
import { UserUpdateService } from '../services/userUpdate.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';
import { IGetMarketResponse } from '../types/market.interface';

@Component({
  selector: 'mc-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Output() changedTheme = new EventEmitter<boolean>();
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<ICurrentUser | null>;
  selectedCurrency: string = 'USD';
  selectedLanguage: string = 'kz';
  languageOptions: any[] = [
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
  currencyOptions: any[] = [
    {
      value: 'USD',
      label: 'USD',
    },
    {
      value: 'KZT',
      label: 'KZT',
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
  isActiveRoute(): boolean {
    return this.router.isActive('/watchlist', true);
  }
  isActiveRoutePortfolio(): boolean {
    return this.router.isActive('/portfolio', true);
  }
  editProfileName: boolean = false;
  username: string;
  email: string;
  password: string;
  darkMode: boolean;
  currency: string;
  market: IGetMarketResponse;

  constructor(
    private store: Store,
    private modal: NzModalService,
    public translate: TranslateService,
    private router: Router,
    private userUpdateService: UserUpdateService,
    private message: NzMessageService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initializeValue();
  }

  initializeValue(): void {
    this.selectedLanguage = localStorage.getItem('lang') || 'kz';
    this.selectedCurrency = localStorage.getItem('currency') || 'USD';

    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', this.selectedLanguage);
    }

    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    localStorage.setItem('currency', this.selectedCurrency);

    this.currentUser$.subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.email = user.email;
        // this.password = user.password;
      }
    });
    this.userUpdateService
      .getMarketCap()
      .subscribe((data: IGetMarketResponse) => {
        this.market = data;
      });
    this.localStorageService.getDarkMode().subscribe((value: boolean) => {
      this.darkMode = value;
    });

    this.localStorageService.getCurrency().subscribe((value: string) => {
      this.currency = value;
    });
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
    this.translate.use(lang);
    this.selectedLanguage = lang;
    localStorage.setItem('lang', lang);
  }

  changeCurrency(currency: string) {
    this.selectedCurrency = currency;
    localStorage.setItem('currency', currency);
  }

  changeMode(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.changedTheme.emit(this.darkMode);
  }

  editProfile(): void {
    this.editProfileName = !this.editProfileName;
  }

  updateUser(): void {
    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.userUpdateService.userUpdate(data).subscribe((res) => {
      this.message.success('Успешно обновлено');
    });
  }

  signout(): void {
    // this.store.dispatch(logoutAction());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  }
}
