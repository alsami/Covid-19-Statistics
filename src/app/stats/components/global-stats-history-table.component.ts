import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit
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

  public dataSource: MatTableDataSource<GlobalStats>;

  public displayedColumns = ['total', 'deaths', 'recovered', 'fetchedAt'];

  public constructor(private readonly cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.globalStats);
  }

  public ngOnChanges(): void {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.globalStats;
    this.cdr.detectChanges();
  }

  public trackBy(globalStats: GlobalStats): string {
    return globalStats.fetchedAt;
  }
}
