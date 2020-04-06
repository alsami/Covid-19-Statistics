import {
  PROPER_BLUE,
  PROPER_GREEN,
  PROPER_RED,
  PROPER_YELLOW,
  SEMI_PROPER_RED,
} from '@covid19/core/core.constants';
import { BarChartType } from '@covid19/countries/models';

export const BAR_CHART_COLORS = [
  PROPER_BLUE,
  PROPER_YELLOW,
  PROPER_RED,
  SEMI_PROPER_RED,
  PROPER_GREEN,
];

export const BAR_CHART_TYPES: BarChartType[] = [
  {
    label: 'Active Cases',
    value: 'activeCases',
    color: BAR_CHART_COLORS[0],
  },
  {
    label: 'New Cases',
    value: 'newCases',
    color: BAR_CHART_COLORS[1],
  },
  {
    label: 'Deaths',
    value: 'totalDeaths',
    color: BAR_CHART_COLORS[2],
  },
  {
    label: 'New Deaths',
    value: 'newDeaths',
    color: BAR_CHART_COLORS[3],
  },
  {
    label: 'Recovered Cases',
    value: 'recoveredCases',
    color: BAR_CHART_COLORS[4],
  },
];
