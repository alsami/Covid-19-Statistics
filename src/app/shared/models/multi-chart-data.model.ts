import { RegularChartData } from '@covid19/shared/models';

export interface MultiChartData {
  name: string;
  series: RegularChartData[];
}
