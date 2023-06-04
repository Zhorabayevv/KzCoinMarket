import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { NzModalService } from 'ng-zorro-antd/modal';
import { AddTransactionComponent } from '../addTransaction/addTransaction.component';
import {
  currentUserSelector,
  isLoggedInSelector,
} from 'src/app/auth/store/selectors';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { PortFolioService } from 'src/app/portfolio/services/portfolio.service';
import { IGetAllProtfolio } from '../../types/getAllPortfolio.interface';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

@Component({
  selector: 'mc-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  darkMode: boolean;
  currency: string;
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<ICurrentUser | null>;
  portfolios: any;
  colors: string[] = [
    '#ff4cff',
    '#FF6681',
    '#51C4E9',
    '#FFC24C',
    '#4CFF4C',
    '#8B79D9',
    '#C7D860',
    '#48FFE9',
    '#92FF77',
  ];
  invisBalance: boolean = false;
  coins;
  editing: boolean = false;
  newPortfolio: boolean = false;
  validateForm: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
  });
  selectedWallet;
  selectedWalletName: string;
  fullPrice: number;

  constructor(
    public translate: TranslateService,
    private modal: NzModalService,
    private store: Store,
    private portfolioService: PortFolioService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.localStorageService.getDarkMode().subscribe((value: boolean) => {
      this.darkMode = value;
      console.log(this.darkMode);
    });

    this.localStorageService.getCurrency().subscribe((value: string) => {
      this.currency = value;
    });
    this.getAllPortfolios();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.portfolios, event.previousIndex, event.currentIndex);
  }

  balanceVis(): void {
    this.invisBalance = !this.invisBalance;
  }

  selectPortfolio(portfolio): void {
    this.selectedWallet = portfolio;
    this.coins = portfolio.coins.coinDto;
    this.selectedWalletName = portfolio.name;
    this.fullPrice = portfolio.fullPrice;
  }

  getAllPortfolios(): void {
    this.portfolioService
      .getAllPortfolios()
      .subscribe((portfolios: IGetAllProtfolio) => {
        console.log(portfolios);
        this.portfolios = portfolios.walletModel;
        this.portfolios.forEach((portfolio, index) => {
          portfolio.color = this.colors[index];
        });
        this.selectedWallet = portfolios.walletModel[0];
        this.selectedWalletName = portfolios.walletModel[0].name;
        this.fullPrice = portfolios.walletModel[0].fullPrice;

        console.log(this.selectedWallet.coins);

        this.coins = this.selectedWallet.coins.coinWalletDto;
        console.log(this.coins);
      });
  }

  addCoin(): void {
    console.log(this.selectedWallet);
    const modal = this.modal.create({
      nzTitle: null,
      nzContent: AddTransactionComponent,
      nzComponentParams: {
        idWallet: this.selectedWallet.id,
      },
      nzFooter: null,
    });
    modal.afterClose.subscribe((result) => {
      this.getAllPortfolios();
    });
  }

  editPortfolio(): void {
    this.editing = !this.editing;
  }

  createPortfolio(): void {
    this.newPortfolio = true;
  }

  addPortfolio(): void {
    this.newPortfolio = false;
    this.portfolioService
      .createPortfolio(this.validateForm.value)
      .subscribe((res) => {
        this.getAllPortfolios();
      });
  }

  cancelAddPortfolio(): void {
    this.newPortfolio = false;
  }
}
