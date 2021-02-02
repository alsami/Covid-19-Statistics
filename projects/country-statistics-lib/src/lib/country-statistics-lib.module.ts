import { NgModule } from '@angular/core';
import {
  CountriesStatsHistoryService,
  CountriesStatsService,
  CountryStatisticsVaryService,
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
    CountryStatisticsVaryService,
  ],
})
export class CountryStatisticsLibModule {}
