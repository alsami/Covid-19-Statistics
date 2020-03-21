import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CountryStats } from '@covid19/countries/models';
import { RegularChartData } from '@covid19/shared/models';

@Component({
  selector: 'covid19-country-stats-pie-chart',
  templateUrl: './country-stats-pie-chart.component.html',
  styleUrls: ['./country-stats-pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryStatsPieChartComponent implements OnChanges {
  @Input() countryStats: CountryStats;
  data: RegularChartData[] = [];

  // cases, deaths, recovered
  public colorScheme = {
    domain: ['#AAAAAA', '#ff0000', '#5AA454']
  };

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.countryStats) {
      return;
    }

    if (
      changes.countryStats.previousValue &&
      changes.countryStats.previousValue === changes.countryStats.currentValue
    ) {
      return;
    }

    this.data = [];

    this.data.push({
      name: 'Active cases',
      value: this.countryStats.activeCases
    });

    this.data.push({
      name: 'Deaths',
      value: this.countryStats.totalDeaths
    });

    this.data.push({
      name: 'Recovered',
      value: this.countryStats.recoveredCases
    });
  }
}
