import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

  public constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    if (!this.closedCasesStats || !this.closedCasesStats.length) {
      return;
    }

    this.dataSource.data = this.closedCasesStats;
    this.cdr.detectChanges();
  }

  public trackBy(globalStats: ClosedCaseStats): string {
    return globalStats.fetchedAt;
  }
}
