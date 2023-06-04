import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISelectCoin } from 'src/app/portfolio/types/selectCoin.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PortFolioService } from 'src/app/portfolio/services/portfolio.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

@Component({
  selector: 'add-transaction',
  templateUrl: './addTransaction.component.html',
  styleUrls: ['./addTransaction.component.scss'],
})
export class AddTransactionComponent implements OnInit {
  @Input() idWallet: number;
  coins;
  coinsSelect = [
    {
      value: 'BTC',
      label: 'Bitcoin',
      price: 29000,
    },
    {
      value: 'ETH',
      label: 'Ethereum',
      price: 2000,
    },
    {
      value: 'XRP',
      label: 'XRP',
      price: 2,
    },
  ];
  selectedOS: string;
  quantity: number;
  pricePerCoin: number;
  totalSpent: number;
  search: string;
  validateForm: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    amount: [null, [Validators.required, Validators.min(1)]],
    coin: [null, [Validators.required]],
  });
  darkMode: boolean;
  currency: string;

  addTransActive: boolean = false;
  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private portfolioService: PortFolioService,
    private modal: NzModalService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.portfolioService.getSelect().subscribe((data) => {
      this.coins = data;
      this.coins = this.coins.slice(0, 10)
    });
    this.calculateTotalSpent();
    this.seacrchCoin();
  }

  selectCoin(coin): void {
    console.log(coin);
    this.addTransActive = true;
    const selected = this.coinsSelect.find(
      (item) => item.value === coin.symbol
    );
    this.selectedOS = selected.value;
    this.pricePerCoin = selected.price;
  }

  optionCoin(coin): void {
    const selected = this.coinsSelect.find((item) => item.value === coin.value);
    this.selectedOS = selected.value;
    this.pricePerCoin = selected.price;
    this.calculateTotalSpent();
  }

  seacrchCoin(): void {
    console.log(this.search);
  }

  calculateTotalSpent(): void {
    if (!this.quantity || !this.pricePerCoin) return;
    this.totalSpent = this.pricePerCoin * this.quantity;
  }

  addTransaction(): void {
    if (this.quantity) {
      console.log(this.selectedOS, this.quantity);
      console.log(this.idWallet);

      const transaction = {
        symbol: this.selectedOS,
        amount: this.quantity,
        walletId: this.idWallet,
      };

      this.portfolioService.buyCoin(transaction).subscribe(
        (data) => {
          console.log(data);
          this.message.success(this.translate.instant('transaction_success'));
          this.modal.closeAll();
        },
        (error) => {
          this.message.error(this.translate.instant('transaction_failed'));
          this.modal.closeAll();
        }
      );
    } else {
      this.message.error(this.translate.instant('please_fill_all_fields'));
    }
  }
}
