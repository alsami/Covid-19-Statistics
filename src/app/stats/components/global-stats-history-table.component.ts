import {
  ChangeDetectionStrategy,
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

  public dataSource: MatTableDataSource<GlobalStats> = new MatTableDataSource(
    []
  );

  public displayedColumns = ['total', 'deaths', 'recovered', 'fetchedAt'];

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    if (!this.globalStats || !this.globalStats.length) {
      return;
    }

    this.dataSource.data = this.globalStats;
    console.log(this.dataSource.data);
  }

  public trackBy(globalStats: GlobalStats): string {
    return globalStats.fetchedAt;
  }
}
