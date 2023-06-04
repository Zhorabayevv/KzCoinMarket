import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedTogglerModule } from '../shared/modules/feedToggler/coinToggler.module';
import { KazakhCoinsComponent } from './components/kazakhCoins.component';
import { KazakhCoinsService } from './services/kazakhCoins.service';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { LocalStorageService } from '../shared/services/localStorageChanged.service';

const routes: Routes = [
  {
    path: 'kazakh-coins',
    component: KazakhCoinsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedTogglerModule,
    FeedModule,
  ],
  exports: [],
  declarations: [KazakhCoinsComponent],
  providers: [KazakhCoinsService, LocalStorageService],
})
export class KazakhCoinsModule {}
