import { NgAntModule } from './../ng-zorro-antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

import { ArticleComponent } from './components/article/article.component';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';
import { reducers } from 'src/app/article/store/reducers';
import { GetArticleEffect } from 'src/app/article/store/effects/getArticle.effect';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { ErrorMessageModule } from 'src/app/shared/modules/errorMessage/errorMessage.module';
import { TagListModule } from 'src/app/shared/modules/tagList/tagList.module';
import { DeleteArticleEffect } from './store/effects/deleteArticle.effect';
import { ArticleService } from 'src/app/article/services/article.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageService } from '../shared/services/localStorageChanged.service';

const routes: Routes = [
  {
    path: 'articles/:symbol',
    component: ArticleComponent,
  },
];
const icons: IconDefinition[] = [SearchOutline];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    LoadingModule,
    ErrorMessageModule,
    TagListModule,
    NzIconModule.forRoot(icons),
    NgAntModule,
    FormsModule,
    TranslateModule,
  ],
  declarations: [ArticleComponent],
  providers: [ArticleService, SharedArticleService, LocalStorageService],
})
export class ArticleModule {}
