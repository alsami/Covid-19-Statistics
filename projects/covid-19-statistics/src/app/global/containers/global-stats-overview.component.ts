import { Component, OnInit } from '@angular/core';
import { GlobalStatistics } from '@covid19-global-statistics-lib/lib/models';
import {
  fromGlobalStatistics,
  globalStatsActions,
  globalStatsHistoryActions,
} from '@covid19-global-statistics-lib/public-api';
import { TitleActions } from '@covid19-statistics/core/+state/actions';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'covid19-global-stats-overview',
  templateUrl: './global-stats-overview.component.html',
  styleUrls: ['./global-stats-overview.component.scss'],
})
export class GlobalStatsOverviewComponent implements OnInit {
  globalStats$: Observable<GlobalStatistics>;
  globalStatsHistory$: Observable<GlobalStatistics[]>;
  globalStatsDayHistory$: Observable<GlobalStatistics[]>;
  loading$: Observable<boolean>;

  public loadGlobalStats = (): void => {
    this.store.dispatch(globalStatsActions.load());
  };

  public loadGlobalStatsHistory = (): void => {
    this.store.dispatch(globalStatsHistoryActions.load());
  };

  tabLabelsFunc = [
    {
      label: 'Overview',
      func: this.loadGlobalStats,
    },
    {
      label: 'History',
      func: this.loadGlobalStatsHistory,
    },
    {
      label: 'Graph',
      func: this.loadGlobalStatsHistory,
    },
  ];

  public constructor(
    private readonly store: Store<fromGlobalStatistics.GlobalStatisticsState>
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new TitleActions.SetTitle('Global'));
    this.globalStats$ = this.store.pipe(
      select(fromGlobalStatistics.getGlobalStats)
    );
    this.globalStatsHistory$ = this.store.pipe(
      select(fromGlobalStatistics.getGlobalHistoryStats)
    );
    this.loading$ = combineLatest(
      this.store.pipe(select(fromGlobalStatistics.getGlobalStatsLoading)),
      this.store.pipe(select(fromGlobalStatistics.getGlobalHistoryStatsLoading))
    ).pipe(
      map(
        ([globalStatsLoading, globalStatsHistoryLoading]) =>
          globalStatsLoading || globalStatsHistoryLoading
      )
    );
  }

  public animationDone(index: number) {
    this.tabLabelsFunc[index].func();
  }
}
