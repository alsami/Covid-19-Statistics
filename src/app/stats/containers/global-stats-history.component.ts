import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { globalStatsHistoryActions } from '@covid19/stats/+state/actions';
import * as fromStats from '@covid19/stats/+state/reducer';
import { GlobalStats } from '@covid19/stats/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'covid19-global-stats-history',
  templateUrl: './global-stats-history.component.html',
  styleUrls: ['./global-stats-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalStatsHistoryComponent implements OnInit {
  globalStatsHistory$: Observable<GlobalStats[]>;
  loading$: Observable<boolean>;

  public constructor(private readonly store: Store<fromStats.StatsState>) {}

  public ngOnInit(): void {
    this.store.dispatch(globalStatsHistoryActions.load());
    this.loading$ = this.store.pipe(
      select(fromStats.getGlobalHistoryStatsLoading)
    );
    this.globalStatsHistory$ = this.store.pipe(
      select(fromStats.getGlobalHistoryStats)
    );
  }
}
