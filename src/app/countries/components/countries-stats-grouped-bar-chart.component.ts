import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import {
  PROPER_BLUE,
  PROPER_GREEN,
  PROPER_RED,
} from '@covid19/core/core.constants';
import { CountryStats } from '@covid19/countries/models';
import { GroupedBarChartData } from '@covid19/shared/models';

@Component({
  selector: 'covid19-countries-stats-grouped-bar-chart',
  templateUrl: './countries-stats-grouped-bar-chart.component.html',
  styleUrls: ['./countries-stats-grouped-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesStatsGroupedBarChartComponent implements OnChanges {
  @Input() countryStats: CountryStats[] = [];
  public data: GroupedBarChartData[] = [];
  public xAxisLabel: string = 'Country';
  public yAxisLabel: string = '';

  public options: {
    label: string;
    key: string;
    color: string;
    checked: boolean;
  }[] = [
    {
      label: 'Active Cases',
      key: 'activeCases',
      color: PROPER_BLUE,
      checked: true,
    },
    {
      label: 'Deaths',
      key: 'totalDeaths',
      color: PROPER_RED,
      checked: true,
    },
    {
      label: 'Recovered',
      key: 'recoveredCases',
      color: PROPER_GREEN,
      checked: true,
    },
  ];

  public colorScheme = {
    domain: [],
  };

  public ngOnChanges(): void {
    if (!this.countryStats || !this.countryStats.length) {
      return;
    }

    this.calculateChartData();
  }

  public calculateChartData(): void {
    this.data = [];
    this.colorScheme.domain = [];
    this.yAxisLabel = '';

    this.options.forEach((option) => {
      if (option.checked) {
        this.yAxisLabel +=
          this.yAxisLabel === '' ? option.label : `, ${option.label}`;
      }
    });

    const sortedCountryStats = this.countryStats
      .slice()
      .sort((left, right) => left.fetchedAt.localeCompare(right.fetchedAt));

    sortedCountryStats.slice(0, 5).forEach((stats) => {
      const groupedBarChartData: GroupedBarChartData = {
        name: stats.country,
        series: [],
      };

      this.options.forEach((option) => {
        if (option.checked) {
          groupedBarChartData.series.push({
            name: option.label,
            value: stats[option.key],
          });

          this.colorScheme.domain.push(option.color);
        }
      });

      this.data.push(groupedBarChartData);
    });
  }
}
