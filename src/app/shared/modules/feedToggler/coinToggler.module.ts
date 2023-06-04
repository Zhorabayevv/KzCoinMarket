import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { FeedTogglerComponent } from 'src/app/shared/modules/feedToggler/components/feedToggler/coinToggler.component';
import { NgAntModule } from 'src/app/ng-zorro-antd.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

const icons: IconDefinition[] = [SearchOutline];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgAntModule,
    FormsModule,
    NzIconModule.forRoot(icons),
    TranslateModule,
  ],
  declarations: [FeedTogglerComponent],
  exports: [FeedTogglerComponent],
  providers: [LocalStorageService],
})
export class FeedTogglerModule {}
