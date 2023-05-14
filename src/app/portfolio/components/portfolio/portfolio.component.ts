import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { IPortfolio } from '../../types/portfolio.interface';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddTransactionComponent } from '../addTransaction/addTransaction.component';

@Component({
  selector: 'mc-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  portfolios: IPortfolio[] = [
    {
      name: 'Portfolio 1',
      price: 100,
      color: '',
    },
    {
      name: 'Portfolio 2',
      price: 100,
      color: '',
    },
    {
      name: 'Portfolio 3',
      price: 100,
      color: '',
    },
  ];
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
  coins = [
    {
      logo: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 100,
      change24: 0.8,
      holdings: 174805.05,
      quantity: 8,
      avgBuyPrice: 100,
      profit: 7732.84,
      profitPercent: 0.8
    }
  ]

  constructor(public translate: TranslateService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.portfolios.forEach((portfolio, index) => {
      portfolio.color = this.colors[index];
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.portfolios, event.previousIndex, event.currentIndex);
  }

  balanceVis(): void {
    this.invisBalance = !this.invisBalance;
  }

  addCoin(): void {
    const modal = this.modal.create({
      nzTitle: null,
      nzContent: AddTransactionComponent,
      nzComponentParams: {
      },
      nzFooter: null,
    })
  }
}
