import { VaryType } from '@covid19-country-statistics-lib/lib/models/vary-type.enum';

export interface CountryStatisticsVary {
  varyType: VaryType;
  vary?: number;
  valueYesterday?: number;
  valueToday: number;
}
