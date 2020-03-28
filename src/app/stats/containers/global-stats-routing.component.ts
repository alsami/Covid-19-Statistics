import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleActions } from '@covid19/core/+state/actions';
import { globalStatsDayHistoryActions } from '@covid19/stats/+state/actions/';
import * as fromStats from '@covid19/stats/+state/reducer';
import { GlobalStats } from '@covid19/stats/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'covid19-global-stats-routing',
  templateUrl: './global-stats-routing.component.html',
  styleUrls: ['./global-stats-routing.component.scss']
})
export class GlobalStatsRoutingComponent implements OnInit {
  globalStatsDayHistory$: Observable<GlobalStats[]>;
  loading$: Observable<boolean>;
  public activeLink = '';

  public loadGlobalStatsDayHistory = (): void => {
    this.store.dispatch(globalStatsDayHistoryActions.load());
  };

  linkLabels = [
    {
      label: 'Current',
      link: 'current'
    },
    {
      label: 'History',
      link: 'history'
    },
    {
      label: 'Graph',
      link: 'graph'
    }
  ];

  public constructor(
    private readonly store: Store<fromStats.StatsState>,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activeLink = this.router.url.split('/').reverse()[0];

    this.store.dispatch(new TitleActions.SetTitle('Global'));
    this.store.pipe(select(fromStats.getGlobalDayHistoryStatsLoading));
    this.globalStatsDayHistory$ = this.store.pipe(
      select(fromStats.getGlobalDayHistoryStats)
    );
  }

  linkUpdate(event): void {
    console.log('UPDATE', event);
  }
}
