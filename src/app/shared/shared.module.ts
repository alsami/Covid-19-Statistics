import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@covid19/material/material.module';
import {
  ComponentLoaderOverlayComponent,
  PageLoadingIndicatorComponent
} from '@covid19/shared/components';
import { DiffNumberColorDirective } from '@covid19/shared/directives';
import { ValueDiffPipe } from '@covid19/shared/pipes';

const COMPONENTS = [
  PageLoadingIndicatorComponent,
  ComponentLoaderOverlayComponent,
  DiffNumberColorDirective,
  ValueDiffPipe
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, MaterialModule],
  exports: [...COMPONENTS]
})
export class SharedModule {}
