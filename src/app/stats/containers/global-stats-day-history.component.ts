import { Component, OnInit } from '@angular/core';
import { globalStatsDayHistoryActions } from '@covid19/stats/+state/actions/';
import * as fromStats from '@covid19/stats/+state/reducer';
import { GlobalStats } from '@covid19/stats/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'covid19-global-stats-day-history',
  templateUrl: './global-stats-day-history.component.html',
  styleUrls: ['./global-stats-day-history.component.scss']
})
export class GlobalStatsDayHistoryComponent implements OnInit {
  globalStatsDayHistory$: Observable<GlobalStats[]>;
  loading$: Observable<boolean>;

  public constructor(private readonly store: Store<fromStats.StatsState>) {}

  public ngOnInit(): void {
    this.loading$ = this.store.pipe(
      select(fromStats.getGlobalDayHistoryStatsLoading)
    );
    this.store.dispatch(globalStatsDayHistoryActions.load());
    this.globalStatsDayHistory$ = this.store.pipe(
      select(fromStats.getGlobalDayHistoryStats)
    );
  }
}
