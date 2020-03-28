import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalStats } from '@covid19/stats/models';

@Component({
  selector: 'covid19-global-stats-history-table',
  templateUrl: './global-stats-history-table.component.html',
  styleUrls: ['./global-stats-history-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalStatsHistoryTableComponent implements OnInit, OnChanges {
  @Input() globalStats: GlobalStats[] = [];

  public dataSource: MatTableDataSource<GlobalStats> = new MatTableDataSource(
    []
  );

  public displayedColumns = ['total', 'deaths', 'recovered', 'fetchedAt'];

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.globalStats) {
      return;
    }

    this.dataSource.data = this.globalStats;
  }

  public trackBy(globalStats: GlobalStats): string {
    return globalStats.fetchedAt;
  }

  public getPreviousTotalDiff(current: GlobalStats): number {
    const index = this.globalStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.globalStats.length - 1) {
      return;
    }

    const previous = this.globalStats[index + 1];

    const diff = current.total - previous.total;

    return diff;
  }

  public getPreviousDeathsDiff(current: GlobalStats): number {
    const index = this.globalStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.globalStats.length - 1) {
      return 0;
    }

    const previous = this.globalStats[index + 1];

    const diff = current.deaths - previous.deaths;

    return diff;
  }

  public getPreviousRecoveredDiff(current: GlobalStats): number {
    const index = this.globalStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.globalStats.length - 1) {
      return 0;
    }

    const previous = this.globalStats[index + 1];

    const diff = current.recovered - previous.recovered;

    return diff;
  }
}
