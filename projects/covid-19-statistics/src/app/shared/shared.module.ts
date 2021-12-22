import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadersModule } from '@covid19-statistics/loaders/loaders.module';
import { MaterialModule } from '@covid19-statistics/material/material.module';
import {
  ComponentLoaderOverlayComponent,
  PageLoaderOverlayComponent,
  PageLoadingIndicatorComponent,
} from '@covid19-statistics/shared/components';
import { DiffNumberColorDirective } from '@covid19-statistics/shared/directives';
import {
  CountryFlagPipe,
  PercentagePipe,
  ThousandSuffixesPipe,
  ValueDiffPipe,
} from '@covid19-statistics/shared/pipes';

const COMPONENTS = [
  PageLoadingIndicatorComponent,
  PageLoaderOverlayComponent,
  ComponentLoaderOverlayComponent,
  DiffNumberColorDirective,
  ValueDiffPipe,
  PercentagePipe,
  CountryFlagPipe,
  ThousandSuffixesPipe,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, MaterialModule, LoadersModule],
  exports: [...COMPONENTS],
})
export class SharedModule {}
