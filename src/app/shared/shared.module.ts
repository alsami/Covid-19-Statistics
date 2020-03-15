import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@covid19/material/material.module';
import {
  PageLoadingIndicatorComponent,
  ComponentLoaderOverlayComponent
} from '@covid19/shared/components';

const COMPONENTS = [
  PageLoadingIndicatorComponent,
  ComponentLoaderOverlayComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, MaterialModule],
  exports: [...COMPONENTS]
})
export class SharedModule {}
