import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CountryStatsDayHistoryEffects,
  CountryStatsEffects,
  CountryStatsHistoryEffects
} from '@covid19/countries/+state/effects';
import * as fromCountries from '@covid19/countries/+state/reducer';
import {
  CountryCardComponent,
  CountryStatsHistoryLineChartComponent,
  CountryStatsHistoryTableComponent,
  CountryStatsStackedBarChartComponent as CountryStatsHistoryStackedBarChartComponent
} from '@covid19/countries/components';
import {
  CountryStatsHistoryOverviewComponent,
  CountryStatsOverviewComponent
} from '@covid19/countries/containers';
import {
  CountryStatsDayHistoryService,
  CountryStatsHistoryService,
  CountryStatsService
} from '@covid19/countries/services';
import { MaterialModule } from '@covid19/material/material.module';
import { SharedModule } from '@covid19/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountriesRoutingModule } from './countries-routing.module';

const COMPONENTS = [
  CountryStatsOverviewComponent,
  CountryCardComponent,
  CountryStatsHistoryOverviewComponent,
  CountryStatsHistoryTableComponent,
  CountryStatsHistoryStackedBarChartComponent,
  CountryStatsHistoryLineChartComponent
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
      CountryStatsEffects,
      CountryStatsHistoryEffects,
      CountryStatsDayHistoryEffects
    ])
  ],
  providers: [
    CountryStatsService,
    CountryStatsHistoryService,
    CountryStatsDayHistoryService
  ]
})
export class CountriesModule {}
