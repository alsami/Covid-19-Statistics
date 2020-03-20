import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActiveCaseStats } from '@covid19/cases/models';

@Component({
  selector: 'covid19-active-cases-stats-history-table',
  templateUrl: './active-cases-stats-history-table.component.html',
  styleUrls: ['./active-cases-stats-history-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveCasesStatsHistoryTable implements OnInit, OnChanges {
  @Input() activeCasesStats: ActiveCaseStats[] = [];

  public dataSource: MatTableDataSource<
    ActiveCaseStats
  > = new MatTableDataSource([]);

  public displayedColumns = ['total', 'mild', 'serious', 'fetchedAt'];

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    console.log(this.activeCasesStats);
    if (!this.activeCasesStats || !this.activeCasesStats.length) {
      this.dataSource.data = [];
      return;
    }

    this.dataSource.data = this.activeCasesStats;
    console.log(this.dataSource.data);
  }

  public trackBy(globalStats: ActiveCaseStats): string {
    return globalStats.fetchedAt;
  }

  public getPreviousTotalDiff(current: ActiveCaseStats): number {
    const index = this.activeCasesStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.activeCasesStats.length - 1) {
      return;
    }

    const previous = this.activeCasesStats[index + 1];

    const diff = current.total - previous.total;

    return diff;
  }

  public getPreviousMildlDiff(current: ActiveCaseStats): number {
    const index = this.activeCasesStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.activeCasesStats.length - 1) {
      return;
    }

    const previous = this.activeCasesStats[index + 1];

    const diff = current.mild - previous.mild;

    return diff;
  }

  public getPreviousSeriousDiff(current: ActiveCaseStats): number {
    const index = this.activeCasesStats.findIndex(stat => stat === current);

    if (index === -1 || index === this.activeCasesStats.length - 1) {
      return;
    }

    const previous = this.activeCasesStats[index + 1];

    const diff = current.serious - previous.serious;

    return diff;
  }
}
