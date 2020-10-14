import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  EllipsisLoaderComponent,
  PulseLoaderComponent,
  RectangleLoaderComponent,
} from '@covid19-statistics/loaders/components';
import { MaterialModule } from '@covid19-statistics/material/material.module';

const COMPONENTS = [
  RectangleLoaderComponent,
  EllipsisLoaderComponent,
  PulseLoaderComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, MaterialModule],
  exports: [COMPONENTS],
})
export class LoadersModule {}
