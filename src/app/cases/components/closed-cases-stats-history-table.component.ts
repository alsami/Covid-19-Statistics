import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClosedCaseStats } from '@covid19/cases/models';

@Component({
  selector: 'covid19-closed-cases-stats-history-table',
  templateUrl: './closed-cases-stats-history-table.component.html',
  styleUrls: ['./closed-cases-stats-history-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClosedCasesStatsHistoryTable implements OnInit, OnChanges {
  @Input() closedCasesStats: ClosedCaseStats[] = [];

  public dataSource: MatTableDataSource<
    ClosedCaseStats
  > = new MatTableDataSource([]);

  public displayedColumns = ['total', 'deaths', 'recovered', 'fetchedAt'];

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    console.log(this.closedCasesStats);
    if (!this.closedCasesStats || !this.closedCasesStats.length) {
      return;
    }

    this.dataSource.data = this.closedCasesStats;
    console.log(this.dataSource.data);
  }

  public trackBy(globalStats: ClosedCaseStats): string {
    return globalStats.fetchedAt;
  }

  public getPreviousTotalDiff(current: ClosedCaseStats): number {
    const index = this.closedCasesStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.closedCasesStats.length - 1) {
      return;
    }

    const previous = this.closedCasesStats[index + 1];

    const diff = current.total - previous.total;

    return diff;
  }

  public getPreviousDeathsDiff(current: ClosedCaseStats): number {
    const index = this.closedCasesStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.closedCasesStats.length - 1) {
      return;
    }

    const previous = this.closedCasesStats[index + 1];

    const diff = current.deaths - previous.deaths;

    return diff;
  }

  public getPreviousRecoveredDiff(current: ClosedCaseStats): number {
    const index = this.closedCasesStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.closedCasesStats.length - 1) {
      return;
    }

    const previous = this.closedCasesStats[index + 1];

    const diff = current.recovered - previous.recovered;

    return diff;
  }
}
