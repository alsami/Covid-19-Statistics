import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { PROPER_GREEN } from '@covid19/core/core.constants';
import { CountryStats } from '@covid19/countries/models';
import { RegularChartData } from '@covid19/shared/models';

@Component({
  selector: 'covid19-countries-stats-daily-recoveredcases-barchart',
  templateUrl: './countries-stats-dail-recoveredcases-bar-chart.component.html',
  styleUrls: ['./countries-stats-dail-recoveredcases-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesStatsDailyRecoveredCasesBarChartComponent
  implements OnChanges {
  @Input() countryStatsHistory: CountryStats[] = [];

  public data: RegularChartData[] = [];

  public xAxisLabel: string = 'UTC Date';
  public yAxisLabel: string = 'Recovered cases';

  public colorScheme = {
    domain: [PROPER_GREEN],
  };

  public ngOnChanges(): void {
    if (!this.countryStatsHistory || !this.countryStatsHistory.length) {
      return;
    }

    this.data = [];

    const sortedStats = this.countryStatsHistory
      .slice()
      .sort((left, right) => left.fetchedAt.localeCompare(right.fetchedAt));

    const dates = sortedStats
      .slice()
      .map((stats) => stats.fetchedAt.slice(0, stats.fetchedAt.indexOf('T')));

    const distinctDates = [...new Set(dates)];

    distinctDates.forEach((utcDate) => {
      const recoveredCasesChartData: RegularChartData = {
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

        recoveredCasesChartData.value += stats.recoveredCases;
      }

      this.data.push(recoveredCasesChartData);
    });
  }
}
