import { RegularChartData } from '@covid19-statistics/shared/models';

export interface MultiChartData {
  name: string;
  series: RegularChartData[];
}
