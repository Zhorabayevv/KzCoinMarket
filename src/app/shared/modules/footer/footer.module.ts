import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './components/footer.component';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

@NgModule({
  imports: [CommonModule, RouterModule, TranslateModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
  providers: [LocalStorageService],
})
export class FooterModule {}
