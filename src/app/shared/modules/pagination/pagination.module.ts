import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { NgAntModule } from 'src/app/ng-zorro-antd.module';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

const icons: IconDefinition[] = [SearchOutline];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule.forRoot(icons),
    NgAntModule,
    FormsModule,
    TranslateModule,
  ],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  providers: [UtilsService, LocalStorageService],
})
export class PaginationModule {}
