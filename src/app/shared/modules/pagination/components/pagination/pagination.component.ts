import { Component, Input, OnInit } from '@angular/core';

import { UtilsService } from 'src/app/shared/services/utils.service';
import { ISelect } from 'src/app/shared/modules/navBar/types/select.interface';

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input('totalCount') totalProps: number;
  @Input('limitArticles') limitProps: number;
  @Input('url') urlProps: string;
  @Input('currentPage') currentPageProps: number;
  pagesCount: number;
  pages: number[];
  rowsOptions: ISelect[] = [
    {
      value: '10',
      label: '10',
    },
    {
      value: '20',
      label: '20',
    },
    {
      value: '30',
      label: '30',
    },
  ];
  selectedRows: string = '10';

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps);
    this.pages = this.utilsService.range(1, this.pagesCount);
  }
}
