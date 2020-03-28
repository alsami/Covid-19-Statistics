import { Component, OnInit } from '@angular/core';
import { globalStatsActions } from '@covid19/stats/+state/actions';
import * as fromStats from '@covid19/stats/+state/reducer';
import { GlobalStats } from '@covid19/stats/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'covid19-global-stats-current',
  templateUrl: './global-stats-current.component.html',
  styleUrls: ['./global-stats-current.component.scss']
})
export class GlobalStatsCurrentComponent implements OnInit {
  globalStats$: Observable<GlobalStats>;
  loading$: Observable<boolean>;

  public constructor(private readonly store: Store<fromStats.StatsState>) {}

  public ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromStats.getGlobalStatsLoading));
    this.store.dispatch(globalStatsActions.load());
    this.globalStats$ = this.store.pipe(select(fromStats.getGlobalStats));
  }
}
