import { CountryStatisticsVary } from '@covid19-country-statistics-lib/lib/models';

export interface CountryStatisticsVaryContainer {
  time: Date;
  vary: CountryStatisticsVary[];
}
