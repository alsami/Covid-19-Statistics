import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CountryStats } from '@covid19-country-statistics-lib/public-api';

@Component({
  selector: 'covid19-country-stats-history-table',
  templateUrl: './country-stats-history-table.component.html',
  styleUrls: ['./country-stats-history-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryStatsHistoryTableComponent implements OnInit {
  @Input() countryStats: CountryStats[] = [];

  public dataSource: MatTableDataSource<CountryStats> = new MatTableDataSource(
    []
  );

  public displayedColumns = ['active', 'deaths', 'recovered', 'fetchedAt'];

  public constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    if (!this.countryStats || !this.countryStats.length) {
      return;
    }

    this.dataSource.data = this.countryStats;
    this.cdr.detectChanges();
  }
}
