import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mc-global-feed',
  templateUrl: './globalFeed.component.html',
  styleUrls: ['./globalFeed.component.scss'],
})
export class GlobalFeedComponent {
  apiUrl: string = '/coin/full';
  switchValue: boolean = false;
  loading: boolean = false;

  constructor(public translate: TranslateService) {}

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
