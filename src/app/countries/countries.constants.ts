import {
  PROPER_BLUE,
  PROPER_GREEN,
  PROPER_RED,
} from '@covid19/core/core.constants';
import { BarChartType } from '@covid19/countries/models';

export const BAR_CHART_COLORS = [PROPER_BLUE, PROPER_RED, PROPER_GREEN];

export const BAR_CHART_TYPES: BarChartType[] = [
  {
    label: 'Active Cases',
    value: 'activeCases',
    color: BAR_CHART_COLORS[0],
  },
  {
    label: 'Deaths',
    value: 'totalDeaths',
    color: BAR_CHART_COLORS[1],
  },
  {
    label: 'Recovered Cases',
    value: 'recoveredCases',
    color: BAR_CHART_COLORS[2],
  },
];
