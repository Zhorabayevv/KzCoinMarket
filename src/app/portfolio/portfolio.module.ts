import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { RouterModule, Routes } from '@angular/router';
import { NgAntModule } from '../ng-zorro-antd.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AddTransactionComponent } from './components/addTransaction/addTransaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortFolioService } from './services/portfolio.service';
import { TransactionService } from './services/transaction.services';
import { LocalStorageService } from '../shared/services/localStorageChanged.service';

const routes: Routes = [
  {
    path: 'portfolio',
    component: PortfolioComponent,
  },
];
const icons: IconDefinition[] = [SearchOutline];

@NgModule({
  declarations: [PortfolioComponent, AddTransactionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgAntModule,
    NzIconModule.forRoot(icons),
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PortFolioService, TransactionService, LocalStorageService],
  exports: [],
})
export class PortfolioModule {}
