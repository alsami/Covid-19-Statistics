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
  PROPER_RED,
} from '@covid19-statistics/core/core.constants';
import { RegularChartData } from '@covid19-statistics/shared/models';

@Component({
  selector: 'covid19-country-stats-pie-chart',
  templateUrl: './country-stats-pie-chart.component.html',
  styleUrls: ['./country-stats-pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryStatsPieChartComponent implements OnChanges {
  @Input() countryStats: CountryStats;
  data: RegularChartData[] = [];

  /* 
  active cases, 
  deaths, 
  recovered, 
  */
  public colorScheme = {
    domain: [PROPER_BLUE, PROPER_RED, PROPER_GREEN],
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
      name: 'Active',
      value: this.countryStats.activeCases,
    });

    this.data.push({
      name: 'Deaths',
      value: this.countryStats.totalDeaths,
    });

    this.data.push({
      name: 'Recovered',
      value: this.countryStats.recoveredCases,
    });
  }
}
