import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CountriesStatsEffects,
  CountriesStatsHistoryEffects,
  CountryStatisticsLibModule,
  CountryStatisticsVaryEffects,
  CountryStatsEffects,
  CountryStatsHistoryEffects,
  fromCountryStatistics,
} from '@covid19-country-statistics-lib/public-api';
import {
  CountriesAutoCompleteComponent,
  CountriesStatsGroupedBarChartComponent,
  CountriesStatsStackedBarChartComponent,
  CountriesWorldCardComponent,
  CountryDetailedStatsCardsComponent,
  CountryStatsBarChartComponent,
  CountryStatsCardComponent,
  CountryStatsDailyValuesBarChartComponent,
  CountryStatsDayToDayCardsComponent,
  CountryStatsHistoryLineChartComponent,
  CountryStatsHistoryTableComponent,
  CountryStatsPieChartComponent,
} from '@covid19-statistics/countries/components';
import {
  CountriesStatsOverviewComponent,
  CountriesWorldMapComponent,
  CountryStatsOverviewComponent,
} from '@covid19-statistics/countries/containers';
import { MaterialModule } from '@covid19-statistics/material/material.module';
import { SharedModule } from '@covid19-statistics/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountriesRoutingModule } from './countries-routing.module';

const COMPONENTS = [
  CountriesStatsOverviewComponent,
  CountriesWorldMapComponent,
  CountriesWorldCardComponent,
  CountriesStatsStackedBarChartComponent,
  CountriesStatsGroupedBarChartComponent,
  CountryStatsDailyValuesBarChartComponent,
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
    FormsModule,
    CountriesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxChartsModule,
    CountryStatisticsLibModule,
    StoreModule.forFeature(
      fromCountryStatistics.COUNTRIES_FEATURE_SELECTOR,
      fromCountryStatistics.reducers
    ),
    EffectsModule.forFeature([
      CountriesStatsEffects,
      CountriesStatsHistoryEffects,
      CountryStatsEffects,
      CountryStatsHistoryEffects,
      CountryStatisticsVaryEffects,
    ]),
  ],
})
export class CountriesModule {}
