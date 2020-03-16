import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SidenavContentComponent,
  ToolbarComponent
} from '@covid19/core/components';
import { LayoutComponent } from '@covid19/core/containers';
import { MaterialModule } from '@covid19/material/material.module';

const COMPONENTS = [LayoutComponent, ToolbarComponent, SidenavContentComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, MaterialModule, RouterModule, HttpClientModule],
  exports: [...COMPONENTS]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule
    };
  }
}
