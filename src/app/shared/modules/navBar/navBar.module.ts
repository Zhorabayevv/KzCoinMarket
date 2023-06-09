import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { TranslateModule } from '@ngx-translate/core';

import { NgAntModule } from 'src/app/ng-zorro-antd.module';
import { NavBarComponent } from 'src/app/shared/modules/navBar/components/navBar.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserUpdateService } from './services/userUpdate.service';

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
  declarations: [NavBarComponent],
  exports: [NavBarComponent],
  providers: [UserUpdateService],
})
export class NavBarModule {}
