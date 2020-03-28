import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActiveCaseStats } from '@covid19/cases/models';

@Component({
  selector: 'covid19-active-cases-stats-history-table',
  templateUrl: './active-cases-stats-history-table.component.html',
  styleUrls: ['./active-cases-stats-history-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveCasesStatsHistoryTable implements OnChanges {
  @Input() activeCasesStats: ActiveCaseStats[] = [];

  public dataSource: MatTableDataSource<
    ActiveCaseStats
  > = new MatTableDataSource([]);

  public displayedColumns = ['total', 'mild', 'serious', 'fetchedAt'];

  public constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  public ngOnChanges(): void {
    if (!this.activeCasesStats || !this.activeCasesStats.length) {
      return;
    }

    this.dataSource.data = this.activeCasesStats;
    this.cdr.detectChanges();
  }

  public trackBy(globalStats: ActiveCaseStats): string {
    return globalStats.fetchedAt;
  }
}
