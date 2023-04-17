import { TagListComponent } from './components/taglist/tagList.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [CommonModule],
  declarations: [TagListComponent],
  exports: [TagListComponent]
})
export class TagListModule {}
