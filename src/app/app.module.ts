import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { metaReducers, reducers } from '@covid19/+state';
import { AppRoutingModule } from '@covid19/app-routing.module';
import {
  CountriesOfInterestEffects,
  TitleEffects
} from '@covid19/core/+state/effects';
import { CoreModule } from '@covid19/core/core.module';
import { MaterialModule } from '@covid19/material/material.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// the second parameter 'fr-FR' is optional
registerLocaleData(localeDe, 'de-DE');

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule.forRoot(),
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([TitleEffects, CountriesOfInterestEffects]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
