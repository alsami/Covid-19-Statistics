import { Component, OnInit } from '@angular/core';
import {
  closedCasesStatsActions,
  closedCasesStatsDayHistoryActions,
  closedCasesStatsHistoryActions
} from '@covid19/cases/+state/actions';
import * as fromCases from '@covid19/cases/+state/reducer';
import { ClosedCaseStats } from '@covid19/cases/models';
import { TitleActions } from '@covid19/core/+state/actions';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'covid19-closed-cases-overview',
  templateUrl: './closed-cases-overview.component.html',
  styleUrls: ['./closed-cases-overview.component.scss']
})
export class ClosedCasesOverviewComponent implements OnInit {
  closedCasesStats$: Observable<ClosedCaseStats>;
  closedCasesStatsHistory$: Observable<ClosedCaseStats[]>;
  closedCasesStatsDayHistory$: Observable<ClosedCaseStats[]>;
  loading$: Observable<boolean>;

  public loadGlobalStats = (): void => {
    this.store.dispatch(closedCasesStatsActions.load());
  };

  public loadGlobalStatsHistory = (): void => {
    this.store.dispatch(closedCasesStatsHistoryActions.load());
  };

  public loadGlobalStatsDayHistory = (): void => {
    this.store.dispatch(closedCasesStatsDayHistoryActions.load());
  };

  tabLabelsFunc = [
    {
      label: 'Current',
      func: this.loadGlobalStats
    },
    {
      label: 'History',
      func: this.loadGlobalStatsHistory
    },
    {
      label: 'Graph',
      func: this.loadGlobalStatsDayHistory
    }
  ];

  public constructor(private readonly store: Store<fromCases.CasesState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new TitleActions.SetTitle('Closed cases'));

    this.closedCasesStats$ = this.store.pipe(
      select(fromCases.getClosedCasesStats)
    );
    this.closedCasesStatsHistory$ = this.store.pipe(
      select(fromCases.getClosedCasesHistoryStats)
    );

    this.closedCasesStatsDayHistory$ = this.store.pipe(
      select(fromCases.getClosedCasesDayHistoryStats)
    );

    this.loading$ = combineLatest(
      this.store.pipe(select(fromCases.getClosedCasesStatsLoading)),
      this.store.pipe(select(fromCases.getClosedCasesHistoryStatsLoading)),
      this.store.pipe(select(fromCases.getClosedCasesDayHistoryStatsLoading))
    ).pipe(
      map(
        ([
          globalStatsLoading,
          globalStatsHistoryLoading,
          globalStatsDayHistoryLoading
        ]) =>
          globalStatsLoading ||
          globalStatsHistoryLoading ||
          globalStatsDayHistoryLoading
      )
    );
  }

  public animationDone(index: number): void {
    this.tabLabelsFunc[index].func();
  }
}
