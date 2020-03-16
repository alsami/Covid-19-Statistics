import { Component, OnInit } from '@angular/core';
import * as fromStats from '@covid19/stats/+state/reducer';
import { Store, select } from '@ngrx/store';
import { globalStatsActions } from '@covid19/stats/+state/actions/';
import { Observable } from 'rxjs';
import { GlobalStats } from '@covid19/stats/models';

@Component({
  selector: 'covid-global-stats-overview',
  templateUrl: './global-stats-overview.component.html',
  styleUrls: ['./global-stats-overview.component.scss']
})
export class LatestStatsOverviewComponent implements OnInit {
  globalStats$: Observable<GlobalStats>;
  globalStatsLoading$: Observable<boolean>;

  public constructor(private readonly store: Store<fromStats.StatsState>) {}

  public ngOnInit(): void {
    this.globalStats$ = this.store.pipe(select(fromStats.getLatestStats));
    this.globalStatsLoading$ = this.store.pipe(
      select(fromStats.getLatestStatsLoading)
    );

    this.loadGlobalStats();
  }

  public loadGlobalStats(): void {
    this.store.dispatch(globalStatsActions.load());
  }
}
