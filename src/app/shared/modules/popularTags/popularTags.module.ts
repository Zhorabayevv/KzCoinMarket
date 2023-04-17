import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';

import { PopularTagsService } from 'src/app/shared/modules/popularTags/services/popularTags.service';
import { reducers } from 'src/app/shared/modules/popularTags/store/reducers';
import { PopularTagsComponent } from 'src/app/shared/modules/popularTags/components/popularTags/popularTags.component';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { ErrorMessageModule } from 'src/app/shared/modules/errorMessage/errorMessage.module';
import { GetPopularTagsEffect } from 'src/app/shared/modules/popularTags/store/effects/getPopularTags.effect';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetPopularTagsEffect]),
    StoreModule.forFeature('popularTags', reducers),
    ErrorMessageModule,
    LoadingModule,
    RouterModule
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService]
})
export class PopularTagsModule {}
