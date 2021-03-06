import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { GlobalStatistics } from '@covid19-global-statistics-lib/public-api';
import {
  PROPER_BLUE,
  PROPER_GREEN,
  PROPER_RED,
} from '@covid19-statistics/core/core.constants';
import { LineChartData } from '@covid19-statistics/shared/models/linechart-data.model';

@Component({
  selector: 'covid19-global-stats-history-line-chart',
  templateUrl: './global-stats-history-line-chart.component.html',
  styleUrls: ['./global-stats-history-line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalStatsHistoryLineChartComponent implements OnChanges {
  @Input() globalStats: GlobalStatistics[];

  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'UTC Days';
  yAxisLabel: string = 'Amount';
  timeline: boolean = true;

  // cases, deaths, recovered
  public colorScheme = {
    domain: ['#AAAAAA', PROPER_BLUE, PROPER_RED, PROPER_GREEN],
  };

  public data: LineChartData[] = [];

  ngOnChanges(): void {
    if (!this.globalStats || !this.globalStats.length) {
      return;
    }

    this.data = [];

    const totalCasesLineChartData: LineChartData = {
      name: 'Total Cases',
      series: [],
    };

    const activeCasesLineChart: LineChartData = {
      name: 'Active Cases',
      series: [],
    };

    const deathsLineChartData: LineChartData = {
      name: 'Deaths',
      series: [],
    };

    const recoveredLineChartData: LineChartData = {
      name: 'Recovered',
      series: [],
    };

    const sortedGlobalStats = this.globalStats
      .slice()
      .sort((left, right) => left.fetchedAt.localeCompare(right.fetchedAt));

    sortedGlobalStats.forEach((countryStats) => {
      const isoString = countryStats.fetchedAt.slice(
        0,
        countryStats.fetchedAt.indexOf('T')
      );

      totalCasesLineChartData.series.push({
        name: isoString,
        value: countryStats.total,
      });

      activeCasesLineChart.series.push({
        name: isoString,
        value: countryStats.active,
      });

      deathsLineChartData.series.push({
        name: isoString,
        value: countryStats.deaths,
      });

      recoveredLineChartData.series.push({
        name: isoString,
        value: countryStats.recovered,
      });
    });

    this.data.push(
      totalCasesLineChartData,
      activeCasesLineChart,
      deathsLineChartData,
      recoveredLineChartData
    );
  }
}
