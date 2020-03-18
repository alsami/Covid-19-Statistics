import { Component, OnInit } from '@angular/core';
import {
  activeCasesStatsActions,
  activeCasesStatsHistoryActions
} from '@covid19/cases/+state/actions';
import * as fromCases from '@covid19/cases/+state/reducer';
import { ActiveCaseStats } from '@covid19/cases/models';
import { TitleActions } from '@covid19/core/+state/actions';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'covid19-active-cases-overview',
  templateUrl: './active-cases-overview.component.html',
  styleUrls: ['./active-cases-overview.component.scss']
})
export class ActiveCasesOverviewComponent implements OnInit {
  activeCasesStats$: Observable<ActiveCaseStats>;
  activeCasesStatsHistory$: Observable<ActiveCaseStats[]>;
  loading$: Observable<boolean>;

  public loadGlobalStats = (): void => {
    this.store.dispatch(new TitleActions.SetTitle('Active cases'));
    this.store.dispatch(activeCasesStatsActions.load());
  };

  public loadGlobalStatsHistory = (): void => {
    this.store.dispatch(new TitleActions.SetTitle('Active cases history'));
    this.store.dispatch(activeCasesStatsHistoryActions.load());
  };

  tabLabelsFunc = [
    {
      label: 'Current',
      func: this.loadGlobalStats
    },
    {
      label: 'History',
      func: this.loadGlobalStatsHistory
    }
  ];

  public constructor(private readonly store: Store<fromCases.CasesState>) {}

  public ngOnInit(): void {
    this.activeCasesStats$ = this.store.pipe(
      select(fromCases.getActiveCasesStats)
    );
    this.activeCasesStatsHistory$ = this.store.pipe(
      select(fromCases.getActiveCasesHistoryStats)
    );
    this.loading$ = combineLatest(
      this.store.pipe(select(fromCases.getActiveCasesStatsLoading)),
      this.store.pipe(select(fromCases.getActiveCasesHistoryStatsLoading))
    ).pipe(
      map(
        ([globalStatsLoading, globalStatsHistoryLoading]) =>
          globalStatsLoading || globalStatsHistoryLoading
      )
    );

    this.loadGlobalStats();
  }

  public animationDone(index: number): void {
    this.tabLabelsFunc[index].func();
  }
}
