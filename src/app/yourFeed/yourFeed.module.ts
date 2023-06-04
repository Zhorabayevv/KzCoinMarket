import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { YourFeedComponent } from 'src/app/yourFeed/components/yourFeed/yourFeed.component';
import { FeedModule } from 'src/app/shared/modules/feed/feed.module';
import { BannerModule } from 'src/app/shared/modules/banner/banner.module';
import { FeedTogglerModule } from 'src/app/shared/modules/feedToggler/coinToggler.module';
import { TranslateModule } from '@ngx-translate/core';
import { WatchlistService } from './services/watchlist.service';

const routes: Routes = [
  {
    path: 'watchlist',
    component: YourFeedComponent,
  },
];
const icons: IconDefinition[] = [SearchOutline];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    FeedTogglerModule,
    NzIconModule.forRoot(icons),
    TranslateModule
  ],
  declarations: [YourFeedComponent],
  providers: [WatchlistService],
})
export class YourFeedModule {}
