import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CountryStatsEffects,
  CountryStatsHistoryEffects
} from '@covid19/countries/+state/effects';
import * as fromCountries from '@covid19/countries/+state/reducer';
import {
  CountryCardComponent,
  CountryStatsHistoryTableComponent
} from '@covid19/countries/components';
import {
  CountryStatsHistoryOverviewComponent,
  CountryStatsOverviewComponent
} from '@covid19/countries/containers';
import {
  CountryStatsHistoryService,
  CountryStatsService
} from '@covid19/countries/services';
import { MaterialModule } from '@covid19/material/material.module';
import { SharedModule } from '@covid19/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CountriesRoutingModule } from './countries-routing.module';

const COMPONENTS = [
  CountryStatsOverviewComponent,
  CountryCardComponent,
  CountryStatsHistoryOverviewComponent,
  CountryStatsHistoryTableComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('countries', fromCountries.reducers),
    EffectsModule.forFeature([CountryStatsEffects, CountryStatsHistoryEffects])
  ],
  providers: [CountryStatsService, CountryStatsHistoryService]
})
export class CountriesModule {}
