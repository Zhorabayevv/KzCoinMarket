import { RouterModule } from '@angular/router';
import { FeedService } from './services/feed.service';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { TagListModule } from 'src/app/shared/modules/tagList/tagList.module';
import { FeedComponent } from 'src/app/shared/modules/feed/components/feed/feed.component';
import { GetFeedEffect } from 'src/app/shared/modules/feed/store/effects/getFeed.effect';
import { reducers } from 'src/app/shared/modules/feed/store/reducers';
import { ErrorMessageModule } from 'src/app/shared/modules/errorMessage/errorMessage.module';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { PaginationModule } from 'src/app/shared/modules/pagination/pagination.module';
import { NgAntModule } from 'src/app/ng-zorro-antd.module';
import { HttpClientModule } from '@angular/common/http';

const icons: IconDefinition[] = [SearchOutline];
@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
    TagListModule,
    NgAntModule,
    NzIconModule.forRoot(icons),
    HttpClientModule,
  ],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
