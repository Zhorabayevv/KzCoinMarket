import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UtilsService } from 'src/app/shared/services/utils.service';
import { ISelect } from 'src/app/shared/modules/navBar/types/select.interface';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

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
  @Output() messageEvent = new EventEmitter<number>();
  selectedPage: number = 1;
  pagesCount: number;
  pages: number[];
  rowsOptions: ISelect[] = [
    {
      value: 15,
      label: 15,
    },
    {
      value: 25,
      label: 25,
    },
    {
      value: 35,
      label: 35,
    },
  ];
  selectedRows: number = 15;
  darkMode: boolean;
  currency: string;

  constructor(
    private utilsService: UtilsService,
    public translate: TranslateService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps);
    this.pages = this.utilsService.range(1, this.pagesCount);
    this.localStorageService.getDarkMode().subscribe((value: boolean) => {
      this.darkMode = value;
      console.log(this.darkMode);
    });

    this.localStorageService.getCurrency().subscribe((value: string) => {
      this.currency = value;
    });
  }

  changePage(page: number) {
    console.log('changePage', page);
    this.currentPageProps = page;
    this.router.navigate([this.urlProps], {
      queryParams: { page: page },
    });
  }

  sendMessage() {
    this.messageEvent.emit(this.selectedRows);
  }
}
