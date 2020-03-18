import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { CountryStats } from '@covid19/countries/models';
import { StackedBarChartData } from '@covid19/shared/models';

@Component({
  selector: 'covid19-country-stats-stacked-barchart',
  templateUrl: './country-stats-stacked-bar-chart.component.html',
  styleUrls: ['./country-stats-stacked-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryStatsStackedBarChartComponent implements OnChanges {
  @Input() countryStats: CountryStats[] = [];
  @Input() adjustSize: boolean = false;
  public data: StackedBarChartData[] = [];
  public yAxisLabel: string = 'Country';
  public xAxisLabel: string = 'Cases, Deaths, Recovered';

  public colorScheme = {
    domain: ['#AAAAAA', '#ff0000', '#5AA454']
  };

  viewWidth: number = 100;

  public ngOnChanges(): void {
    if (this.adjustSize) {
      this.viewWidth = 80;
    } else {
      this.viewWidth = 100;
    }

    if (!this.countryStats || !this.countryStats.length) {
      return;
    }

    this.data = [];

    this.countryStats.forEach((countryStat, index) => {
      if (index > 10) return;

      const stackedBarChartData: StackedBarChartData = {
        name: countryStat.country,
        series: [
          {
            name: 'Cases',
            value: countryStat.totalCases
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
