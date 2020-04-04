import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CountriesStatsEffects,
  CountryStatsDayHistoryEffects,
  CountryStatsEffects,
  CountryStatsHistoryEffects,
} from '@covid19/countries/+state/effects';
import * as fromCountries from '@covid19/countries/+state/reducer';
import {
  CountriesAutoCompleteComponent,
  CountriesStatsStackedBarChartComponent,
  CountriesWorldCardComponent,
  CountryDetailedStatsCardsComponent,
  CountryStatsBarChartComponent,
  CountryStatsCardComponent,
  CountryStatsDayToDayCardsComponent,
  CountryStatsHistoryLineChartComponent,
  CountryStatsHistoryTableComponent,
  CountryStatsPieChartComponent,
} from '@covid19/countries/components';
import {
  CountriesStatsOverviewComponent,
  CountriesWorldMapComponent,
  CountryStatsOverviewComponent,
} from '@covid19/countries/containers';
import {
  CountriesStatsService,
  CountryStatsDayHistoryService,
  CountryStatsHistoryService,
  CountryStatsService,
} from '@covid19/countries/services';
import { MaterialModule } from '@covid19/material/material.module';
import { SharedModule } from '@covid19/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountriesRoutingModule } from './countries-routing.module';

const COMPONENTS = [
  CountriesStatsOverviewComponent,
  CountriesWorldMapComponent,
  CountriesWorldCardComponent,
  CountriesStatsStackedBarChartComponent,
  CountryStatsCardComponent,
  CountryDetailedStatsCardsComponent,
  CountryStatsPieChartComponent,
  CountryStatsBarChartComponent,
  CountryStatsDayToDayCardsComponent,
  CountriesAutoCompleteComponent,
  CountryStatsOverviewComponent,
  CountryStatsHistoryTableComponent,
  CountryStatsHistoryLineChartComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxChartsModule,
    StoreModule.forFeature('countries', fromCountries.reducers),
    EffectsModule.forFeature([
      CountriesStatsEffects,
      CountryStatsEffects,
      CountryStatsHistoryEffects,
      CountryStatsDayHistoryEffects,
    ]),
  ],
  providers: [
    CountriesStatsService,
    CountryStatsService,
    CountryStatsHistoryService,
    CountryStatsDayHistoryService,
  ],
})
export class CountriesModule {}
