import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

@Component({
  selector: 'mc-global-feed',
  templateUrl: './globalFeed.component.html',
  styleUrls: ['./globalFeed.component.scss'],
})
export class GlobalFeedComponent implements OnInit {
  apiUrl: string = '/coin/full';
  switchValue: boolean = true;
  loading: boolean = false;
  darkMode: boolean;
  currency: string;

  constructor(
    public translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.localStorageService.getDarkMode().subscribe((value: boolean) => {
      this.darkMode = value;
      console.log(this.darkMode);
    });

    this.localStorageService.getCurrency().subscribe((value: string) => {
      this.currency = value;
    });
  }

  clickSwitch(): void {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.switchValue = !this.switchValue;
        this.loading = false;
      }, 1000);
    }
  }
}
