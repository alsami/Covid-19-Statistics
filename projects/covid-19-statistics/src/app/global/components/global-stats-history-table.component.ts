import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { GlobalStatistics } from '@covid19-global-statistics-lib/public-api';

@Component({
  selector: 'covid19-global-stats-history-table',
  templateUrl: './global-stats-history-table.component.html',
  styleUrls: ['./global-stats-history-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalStatsHistoryTableComponent implements OnChanges {
  @Input() globalStats: GlobalStatistics[] = [];

  public dataSource: MatTableDataSource<
    GlobalStatistics
  > = new MatTableDataSource([]);

  public displayedColumns = [
    'total',
    'active',
    'deaths',
    'recovered',
    'fetchedAt',
  ];

  public constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  public ngOnChanges(): void {
    if (!this.globalStats || !this.globalStats.length) {
      return;
    }

    this.dataSource.data = this.globalStats;
    this.cdr.detectChanges();
  }

  public trackBy(globalStats: GlobalStatistics): string {
    return globalStats.fetchedAt;
  }
}
