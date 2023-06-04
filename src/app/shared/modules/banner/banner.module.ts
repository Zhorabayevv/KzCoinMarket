import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { TranslateModule } from '@ngx-translate/core';

import { NgAntModule } from 'src/app/ng-zorro-antd.module';
import { BannerComponent } from './components/banner.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

const icons: IconDefinition[] = [SearchOutline];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgAntModule,
    NzIconModule.forRoot(icons),
    TranslateModule.forRoot(),
  ],
  declarations: [BannerComponent],
  exports: [BannerComponent],
  providers: [LocalStorageService],
})
export class BannerModule {}
