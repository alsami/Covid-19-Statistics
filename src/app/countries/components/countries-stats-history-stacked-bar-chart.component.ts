import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { CountryStats } from '@covid19/countries/models';
import { StackedBarChartData } from '@covid19/shared/models';

@Component({
  selector: 'covid19-countries-stats-history-stacked-barchart',
  templateUrl: './countries-stats-history-stacked-bar-chart.component.html',
  styleUrls: ['./countries-stats-history-stacked-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountriesStatsStackedBarChartComponent implements OnChanges {
  @Input() countryStats: CountryStats[] = [];
  public data: StackedBarChartData[] = [];
  public yAxisLabel: string = 'Country';
  public xAxisLabel: string = 'Cases, Deaths, Recovered';

  public colorScheme = {
    domain: ['#AAAAAA', '#ff0000', '#5AA454']
  };

  public ngOnChanges(): void {
    if (!this.countryStats || !this.countryStats.length) {
      return;
    }

    this.countryStats.forEach((countryStat, index) => {
      if (index > 10) return;

      const stackedBarChartData: StackedBarChartData = {
        name: countryStat.country,
        series: [
          {
            name: 'Active cases',
            value: countryStat.activeCases
          },
          {
            name: 'Deaths',
            value: countryStat.totalDeaths
          },
          {
            name: 'Recovered',
            value: countryStat.recoveredCases
          }
        ]
      };

      this.data.push(stackedBarChartData);
    });
  }
}
