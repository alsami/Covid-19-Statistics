import { NgModule } from '@angular/core';
import {
  CountriesStatsHistoryService,
  CountriesStatsService,
  CountryStatsHistoryService,
  CountryStatsService,
} from '@covid19-country-statistics-lib/lib/services';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    CountryStatsService,
    CountryStatsHistoryService,
    CountriesStatsService,
    CountriesStatsHistoryService,
  ],
})
export class CountryStatisticsLibModule {}
