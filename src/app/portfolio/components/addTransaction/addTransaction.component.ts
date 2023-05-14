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
  coinsSelect= [
    {
      value: 'BTC',
      label: 'Bitcoin',
    },
    {
      value: 'ETH',
      label: 'Ethereum',
    }
  ]
  selectedOS = {
    value: '',
    label: '',
  };

  addTransActive: boolean = false;
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  selectCoin(coin): void {
    console.log(coin);

    this.addTransActive = true;
    this.selectedOS = this.coinsSelect.find((item) => item.value === coin.symbol);

    console.log(this.selectedOS);
  }
}
