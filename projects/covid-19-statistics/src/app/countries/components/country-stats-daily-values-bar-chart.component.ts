import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { CountryStats } from '@covid19-country-statistics-lib/public-api';
import { RegularChartData } from '@covid19-statistics/shared/models';

@Component({
  selector: 'covid19-country-stats-daily-values-bar-chart',
  templateUrl: './country-stats-daily-values-bar-chart.component.html',
  styleUrls: ['./country-stats-daily-values-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryStatsDailyValuesBarChartComponent implements OnChanges {
  @Input() countryStatsHistory: CountryStats[] = [];
  @Input() key = '';
  @Input() yAxisLabel = '';
  @Input() color = '';

  public data: RegularChartData[] = [];

  public xAxisLabel: string = 'UTC Date';

  public colorScheme = {
    domain: [],
  };

  public ngOnChanges(): void {
    if (!this.countryStatsHistory || !this.countryStatsHistory.length) {
      return;
    }

    if (!this.key || this.key === '') {
      return;
    }

    this.colorScheme.domain = [];
    this.colorScheme.domain.push(this.color);
    this.data = [];

    const sortedStats = this.countryStatsHistory
      .slice()
      .sort((left, right) => left.fetchedAt.localeCompare(right.fetchedAt));

    const dates = sortedStats
      .slice()
      .map((stats) => stats.fetchedAt.slice(0, stats.fetchedAt.indexOf('T')));

    const distinctDates = [...new Set(dates)];

    distinctDates.forEach((utcDate) => {
      const keyedChartData: RegularChartData = {
        name: utcDate,
        value: 0,
      };

      for (let stats of sortedStats) {
        const currentStatsDate = stats.fetchedAt.slice(
          0,
          stats.fetchedAt.indexOf('T')
        );

        if (currentStatsDate !== utcDate) {
          continue;
        }

        keyedChartData.value += stats[this.key];
      }

      this.data.push(keyedChartData);
    });
  }
}
