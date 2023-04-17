import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

import { PaginationComponent } from './components/pagination/pagination.component';
import { UtilsService } from 'src/app/shared/services/utils.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  providers: [UtilsService],
})
export class PaginationModule {}
