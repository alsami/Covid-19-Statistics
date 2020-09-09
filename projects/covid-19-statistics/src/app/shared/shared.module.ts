import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@covid19-statistics/material/material.module';
import {
  ComponentLoaderOverlayComponent,
  PageLoaderOverlayComponent,
  PageLoadingIndicatorComponent,
} from '@covid19-statistics/shared/components';
import { DiffNumberColorDirective } from '@covid19-statistics/shared/directives';
import {
  PercentagePipe,
  ValueDiffPipe,
} from '@covid19-statistics/shared/pipes';

const COMPONENTS = [
  PageLoadingIndicatorComponent,
  PageLoaderOverlayComponent,
  ComponentLoaderOverlayComponent,
  DiffNumberColorDirective,
  ValueDiffPipe,
  PercentagePipe,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, MaterialModule],
  exports: [...COMPONENTS],
})
export class SharedModule {}
