import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from '@covid19/material/material.module';
import { CoreModule } from '@covid19/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@covid19/app-routing.module';
import { TitleEffects } from '@covid19/core/+state/effects';
import { reducers, metaReducers } from '@covid19/+state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
    EffectsModule.forRoot([TitleEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
