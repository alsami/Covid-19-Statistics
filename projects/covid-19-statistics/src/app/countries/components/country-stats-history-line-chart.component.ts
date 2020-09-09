import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CountryStats } from '@covid19-country-statistics-lib/public-api';
import {
  PROPER_BLUE,
  PROPER_GREEN,
  PROPER_GREY,
  PROPER_RED,
  PROPER_YELLOW,
  SEMI_PROPER_RED,
} from '@covid19-statistics/core/core.constants';
import { LineChartData } from '@covid19-statistics/shared/models/linechart-data.model';

@Component({
  selector: 'covid19-country-stats-line-chart',
  templateUrl: './country-stats-history-line-chart.component.html',
  styleUrls: ['./country-stats-history-line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryStatsHistoryLineChartComponent implements OnChanges {
  @Input() countryStats: CountryStats[];

  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'UTC Days';
  yAxisLabel: string = 'Amount';
  timeline: boolean = true;

  /* 
  cases, 
  active cases, 
  new cases, 
  deaths, 
  new deats, 
  recovered, 
  */
  public colorScheme = {
    domain: [
      PROPER_GREY,
      PROPER_BLUE,
      PROPER_YELLOW,
      PROPER_RED,
      SEMI_PROPER_RED,
      PROPER_GREEN,
    ],
  };

  public data: LineChartData[] = [];

  public ngOnChanges(change: SimpleChanges): void {
    if (!this.countryStats || !this.countryStats.length) {
      this.data = [];

      return;
    }

    if (
      change.countryStats.previousValue &&
      change.countryStats.previousValue === change.countryStats.currentValue
    ) {
      return;
    }

    const totalCasesLineChartData: LineChartData = {
      name: 'Total',
      series: [],
    };

    const activeCasesLineChartData: LineChartData = {
      name: 'Active',
      series: [],
    };

    const newCasesLineChartData: LineChartData = {
      name: 'New',
      series: [],
    };

    const deathLineChartData: LineChartData = {
      name: 'Deaths',
      series: [],
    };

    const newDeathsLineChartData: LineChartData = {
      name: 'New Deaths',
      series: [],
    };

    const recoveredLineChartData: LineChartData = {
      name: 'Recovered',
      series: [],
    };

    const sortedStats = this.countryStats
      .slice()
      .sort((left, right) => left.fetchedAt.localeCompare(right.fetchedAt));

    sortedStats.forEach((countryStats) => {
      const isoString = countryStats.fetchedAt.slice(
        0,
        countryStats.fetchedAt.indexOf('T')
      );

      totalCasesLineChartData.series.push({
        name: isoString,
        value: countryStats.totalCases,
      });

      activeCasesLineChartData.series.push({
        name: isoString,
        value: countryStats.activeCases,
      });

      newCasesLineChartData.series.push({
        name: isoString,
        value: countryStats.newCases,
      });

      deathLineChartData.series.push({
        name: isoString,
        value: countryStats.totalDeaths,
      });

      newDeathsLineChartData.series.push({
        name: isoString,
        value: countryStats.newDeaths,
      });

      recoveredLineChartData.series.push({
        name: isoString,
        value: countryStats.recoveredCases,
      });
    });

    this.data.push(
      totalCasesLineChartData,
      activeCasesLineChartData,
      newCasesLineChartData,
      deathLineChartData,
      newDeathsLineChartData,
      recoveredLineChartData
    );
  }
}
