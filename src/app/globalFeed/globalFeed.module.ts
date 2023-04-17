import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgAntModule } from '../ng-zorro-antd.module';
import { PopularTagsModule } from 'src/app/shared/modules/popularTags/popularTags.module';
import { GlobalFeedComponent } from 'src/app/globalFeed/components/globalFeed/globalFeed.component';
import { FeedModule } from 'src/app/shared/modules/feed/feed.module';
import { BannerModule } from 'src/app/shared/modules/banner/banner.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FeedTogglerModule } from '../shared/modules/feedToggler/coinToggler.module';

const routes = [
  {
    path: '',
    component: GlobalFeedComponent,
  },
];
const icons: IconDefinition[] = [SearchOutline];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    NgAntModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule.forRoot(icons),
    FeedTogglerModule,
  ],
  declarations: [GlobalFeedComponent],
})
export class GlobalFeedModule {}
