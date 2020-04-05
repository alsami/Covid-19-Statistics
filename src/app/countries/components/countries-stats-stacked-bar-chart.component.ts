import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { PROPER_GREEN, PROPER_RED } from '@covid19/core/core.constants';
import { CountryStats } from '@covid19/countries/models';
import { StackedBarChartData } from '@covid19/shared/models';

@Component({
  selector: 'covid19-countries-stats-stacked-barchart',
  templateUrl: './countries-stats-stacked-bar-chart.component.html',
  styleUrls: ['./countries-stats-stacked-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesStatsStackedBarChartComponent implements OnChanges {
  @Input() countryStats: CountryStats[] = [];
  public data: StackedBarChartData[] = [];
  public xAxisLabel: string = 'Country';
  public yAxisLabel: string = 'Cases, Deaths, Recovered';

  // cases, deaths, recovered
  public colorScheme = {
    domain: ['#AAAAAA', PROPER_RED, PROPER_GREEN],
  };

  public ngOnChanges(): void {
    if (!this.countryStats || !this.countryStats.length) {
      return;
    }

    this.countryStats.slice(0, 10).forEach((countryStat) => {
      const stackedBarChartData: StackedBarChartData = {
        name: countryStat.country,
        series: [
          {
            name: 'Active cases',
            value: countryStat.activeCases,
          },
          {
            name: 'Deaths',
            value: countryStat.totalDeaths,
          },
          {
            name: 'Recovered',
            value: countryStat.recoveredCases,
          },
        ],
      };

      this.data.push(stackedBarChartData);
    });
  }
}
