import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, RouterModule, TranslateModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {}
