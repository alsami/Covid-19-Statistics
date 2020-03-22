import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@covid19/material/material.module';
import {
  ComponentLoaderOverlayComponent,
  PageLoadingIndicatorComponent
} from '@covid19/shared/components';
import { DiffNumberColorDirective } from '@covid19/shared/directives';

const COMPONENTS = [
  PageLoadingIndicatorComponent,
  ComponentLoaderOverlayComponent,
  DiffNumberColorDirective
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, MaterialModule],
  exports: [...COMPONENTS],
  providers: [DecimalPipe]
})
export class SharedModule {}
