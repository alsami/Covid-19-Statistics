import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CountryStats } from '@covid19-country-statistics-lib/public-api';

@Component({
  selector: 'covid19-country-stats-history-table',
  templateUrl: './country-stats-history-table.component.html',
  styleUrls: ['./country-stats-history-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryStatsHistoryTableComponent implements OnChanges {
  @Input() countryStats: CountryStats[] = [];

  public dataSource: MatTableDataSource<CountryStats> = new MatTableDataSource(
    []
  );

  public displayedColumns = [
    'total',
    'active',
    'deaths',
    'recovered',
    'fetchedAt',
  ];

  public ngOnChanges(): void {
    console.log('CHANGES', this.countryStats);
    if (!this.countryStats || !this.countryStats.length) {
      return;
    }

    const sortedCountryStats = this.countryStats
      .slice()
      .sort((left, right) => right.fetchedAt.localeCompare(left.fetchedAt));

    const dates = sortedCountryStats
      .slice()
      .map((stats) => stats.fetchedAt.slice(0, stats.fetchedAt.indexOf('T')));

    const distinctDates = [...new Set(dates)];

    const accumulated = this.calculateAccumulated(
      distinctDates,
      sortedCountryStats
    );
    console.log('ACCUMULATED!', accumulated);

    this.dataSource.data = accumulated;
  }

  private calculateAccumulated(
    distinctDates: string[],
    sortedCountryStats: CountryStats[]
  ): CountryStats[] {
    const accumlatedValues: CountryStats[] = [];

    distinctDates.forEach((utcDate) => {
      const accumulated: CountryStats = {
        totalCases: 0,
        activeCases: 0,
        recoveredCases: 0,
        newCases: 0,
        newDeaths: 0,
        totalDeaths: 0,
        country: null,
        countryCode: null,
        fetchedAt: null,
      };
      sortedCountryStats.forEach((stats) => {
        const currentUtcDate = stats.fetchedAt.slice(
          0,
          stats.fetchedAt.indexOf('T')
        );

        if (currentUtcDate === utcDate) {
          accumulated.totalCases += stats.totalCases;
          accumulated.activeCases += stats.activeCases;
          accumulated.newCases += stats.newCases;
          accumulated.recoveredCases += stats.recoveredCases;
          accumulated.totalDeaths += stats.totalDeaths;
          accumulated.newDeaths += stats.newDeaths;
          accumulated.fetchedAt = stats.fetchedAt;
        }
      });
      accumlatedValues.push(accumulated);
    });

    return accumlatedValues;
  }
}
