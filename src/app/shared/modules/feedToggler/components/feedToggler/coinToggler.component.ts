import { ISelect } from 'src/app/shared/modules/navBar/types/select.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './coinToggler.component.html',
  styleUrls: ['./coinToggler.component.scss'],
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps: string;
  rowsOptions: ISelect[] = [
    {
      value: 15,
      label: 15,
    },
    {
      value: 25,
      label: 25,
    },
    {
      value: 30,
      label: 30,
    },
  ];
  selectedRows: number = 15;

  isLoggedIn$: Observable<boolean>;
  darkMode: boolean;
  currency: string;

  constructor(
    private store: Store,
    public translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.localStorageService.getDarkMode().subscribe((value: boolean) => {
      this.darkMode = value;
      console.log(this.darkMode);
    });

    this.localStorageService.getCurrency().subscribe((value: string) => {
      this.currency = value;
    });
    // this.selectedRows = this.localStorageService.get('rows') || '15';
  }
}
