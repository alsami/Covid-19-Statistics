import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountryStatsEffects } from '@covid19/countries/+state/effects';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountryCardComponent } from '@covid19/countries/components';
import { CountryStatsOverviewComponent } from '@covid19/countries/containers';
import { CountryStatsService } from '@covid19/countries/services';
import { MaterialModule } from '@covid19/material/material.module';
import { SharedModule } from '@covid19/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CountriesRoutingModule } from './countries-routing.module';

const COMPONENTS = [CountryStatsOverviewComponent, CountryCardComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('countries', fromCountries.reducers),
    EffectsModule.forFeature([CountryStatsEffects])
  ],
  providers: [CountryStatsService]
})
export class CountriesModule {}
