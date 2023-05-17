import { select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISelectCoin } from '../../types/selectCoin.interface';

@Component({
  selector: 'add-transaction',
  templateUrl: './addTransaction.component.html',
  styleUrls: ['./addTransaction.component.scss'],
})
export class AddTransactionComponent implements OnInit {
  coins: ISelectCoin[] = [
    {
      logo: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
    },
    {
      logo: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
    },
  ];
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
  ];
  selectedOS: string;
  quantity: number;
  pricePerCoin: number;
  totalSpent: number;
  search: string;

  addTransActive: boolean = false;
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
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

    console.log(this.selectedOS);
  }

  seacrchCoin(): void {
    console.log(this.search);
  }

  calculateTotalSpent(): void {
    if( !this.quantity || !this.pricePerCoin ) return;
    this.totalSpent = this.pricePerCoin * this.quantity;
  }
}
