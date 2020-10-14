import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  HttpErrorInterceptor,
  NoopInterceptor,
} from '@covid19-statistics/core/interceptor';
import { MaterialModule } from '@covid19-statistics/material/material.module';

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
  imports: [CommonModule, MaterialModule, RouterModule, HttpClientModule],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...interceptors],
    };
  }
}
