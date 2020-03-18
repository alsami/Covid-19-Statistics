import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CountryStats } from '@covid19/countries/models';

@Component({
  selector: 'covid19-country-stats-history-table',
  templateUrl: './country-stats-history-table.component.html',
  styleUrls: ['./country-stats-history-table.component.scss']
})
export class CountryStatsHistoryTableComponent implements OnInit {
  @Input() countryStats: CountryStats[] = [];

  public dataSource: MatTableDataSource<CountryStats> = new MatTableDataSource(
    []
  );

  public displayedColumns = [
    'total',
    'deaths',
    'serious',
    'recovered',
    'fetchedAt'
  ];

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    if (!this.countryStats || !this.countryStats.length) {
      return;
    }

    this.dataSource.data = this.countryStats;
    console.log(this.dataSource.data);
  }

  public trackBy(globalStats: CountryStats): string {
    return globalStats.fetchedAt;
  }

  public getPreviousTotalDiff(current: CountryStats): number {
    const index = this.countryStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.countryStats.length - 1) {
      return;
    }

    const previous = this.countryStats[index + 1];

    const diff = current.totalCases - previous.totalCases;

    return diff;
  }

  public getPreviousDeathsDiff(current: CountryStats): number {
    const index = this.countryStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.countryStats.length - 1) {
      return;
    }

    const previous = this.countryStats[index + 1];

    const diff = current.totalDeaths - previous.totalDeaths;

    return diff;
  }

  public getPreviousSeriousDiff(current: CountryStats): number {
    const index = this.countryStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.countryStats.length - 1) {
      return;
    }

    const previous = this.countryStats[index + 1];

    const diff = current.seriousCases - previous.seriousCases;

    return diff;
  }

  public getPreviousRecoveredDiff(current: CountryStats): number {
    const index = this.countryStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.countryStats.length - 1) {
      return;
    }

    const previous = this.countryStats[index + 1];

    const diff = current.recoveredCases - previous.recoveredCases;

    return diff;
  }
}
