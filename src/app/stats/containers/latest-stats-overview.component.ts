import { Component, OnInit } from '@angular/core';
import * as fromStats from '@covid19/stats/+state/reducer';
import { Store, select } from '@ngrx/store';
import { load } from '@covid19/stats/+state/actions/latest-stats.actions';
import { Observable } from 'rxjs';
import { LatestStats } from '@covid19/stats/models';

@Component({
  selector: 'covid-latest-stats-overview',
  templateUrl: './latest-stats-overview.component.html',
  styleUrls: ['./latest-stats-overview.component.scss']
})
export class LatestStatsOverviewComponent implements OnInit {
  latestStats$: Observable<LatestStats>;

  public constructor(private readonly store: Store<fromStats.StatsState>) {}

  public ngOnInit(): void {
    this.store.dispatch(load());
    this.latestStats$ = this.store.pipe(select(fromStats.getLatestStats));
    this.latestStats$.subscribe(s => console.log('latest', s));
  }
}
