import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@covid19-statistics-environment/environment';
import { metaReducers, reducers } from '@covid19-statistics/+state';
import { AppRoutingModule } from '@covid19-statistics/app-routing.module';
import {
  CountriesOfInterestEffects,
  TitleEffects,
} from '@covid19-statistics/core/+state/effects';
import { CoreModule } from '@covid19-statistics/core/core.module';
import { MaterialModule } from '@covid19-statistics/material/material.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule.forRoot(),
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([TitleEffects, CountriesOfInterestEffects]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
