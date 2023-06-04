import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostsComponent } from './components/posts.component';
import { RouterModule, Routes } from '@angular/router';
import { PostsService } from './services/posts.service';
import { FeedTogglerModule } from '../shared/modules/feedToggler/coinToggler.module';
import { LocalStorageService } from '../shared/services/localStorageChanged.service';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgAntModule } from '../ng-zorro-antd.module';

const routes: Routes = [
  {
    path: 'posts',
    component: PostsComponent,
  },
];
const icons: IconDefinition[] = [SearchOutline];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedTogglerModule,
    TranslateModule,
    NzIconModule.forRoot(icons),
    NgAntModule,
  ],
  exports: [],
  declarations: [PostsComponent],
  providers: [PostsService, LocalStorageService],
})
export class PostsModule {}
