import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@covid19/core/containers';
import {
  ToolbarComponent,
  SidenavContentComponent
} from '@covid19/core/components';
import { MaterialModule } from '@covid19/material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
