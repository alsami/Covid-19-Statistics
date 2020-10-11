import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SidenavContentComponent,
  ToolbarComponent,
} from '@covid19-statistics/core/components';
import { LayoutComponent } from '@covid19-statistics/core/containers';
import {
  HttpErrorInterceptor,
  NoopInterceptor,
} from '@covid19-statistics/core/interceptor';
import { MaterialModule } from '@covid19-statistics/material/material.module';
import { CountryFlagPipe } from '@covid19-statistics/pipes/country-flag.pipe';
import { PipesModule } from '@covid19-statistics/pipes/pipes.module';

const COMPONENTS = [LayoutComponent, ToolbarComponent, SidenavContentComponent];

const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NoopInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
  },
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
  ],
  exports: [...COMPONENTS],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [DecimalPipe, CountryFlagPipe, ...interceptors],
    };
  }
}
