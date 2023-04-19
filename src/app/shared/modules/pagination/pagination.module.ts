import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { NgAntModule } from 'src/app/ng-zorro-antd.module';
import { FormsModule } from '@angular/forms';

const icons: IconDefinition[] = [SearchOutline];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule.forRoot(icons),
    NgAntModule,
    FormsModule,
  ],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  providers: [UtilsService],
})
export class PaginationModule {}
