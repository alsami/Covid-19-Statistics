import * as fromRoot from '@covid19/+state';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromActiveCasesStatsDayHistory from './active-cases-stats-day-history.reducer';
import * as fromActiveCasesStatsHistory from './active-cases-stats-history.reducer';
import * as fromActiveCasesStats from './active-cases-stats.reducer';
import * as fromClosedCasesStatsHistory from './closed-cases-stats-history.reducer';
import * as fromClosedCasesStats from './closed-cases-stats.reducer';

export interface CasesState {
  activeCases: fromActiveCasesStats.ActiveCasesStatsState;
  activeCasesHistory: fromActiveCasesStatsHistory.ActiveCasesStatsHistory;
  activeCasesDayHistory: fromActiveCasesStatsDayHistory.ActiveCasesStatsDayHistory;
  closedCases: fromClosedCasesStats.ClosedCasesStatsState;
  closedCasesHistory: fromClosedCasesStatsHistory.ClosedCasesStatsHistory;
}

export interface State extends fromRoot.AppState {
  cases: CasesState;
}

export const reducers: ActionReducerMap<CasesState> = {
  activeCases: fromActiveCasesStats.reducer,
  activeCasesHistory: fromActiveCasesStatsHistory.reducer,
  activeCasesDayHistory: fromActiveCasesStatsDayHistory.reducer,
  closedCases: fromClosedCasesStats.reducer,
  closedCasesHistory: fromClosedCasesStatsHistory.reducer
};

export const getCasesState = createFeatureSelector<CasesState>('cases');

/**
 * Active
 */

export const getActiveCasesState = createSelector(
  getCasesState,
  state => state.activeCases
);

export const getActiveCasesStats = createSelector(
  getActiveCasesState,
  fromActiveCasesStats.globalStats
);

export const getActiveCasesStatsLoading = createSelector(
  getActiveCasesState,
  fromActiveCasesStats.loading
);

/**
 * Active history
 */

export const getActiveCasesHistoryStatsState = createSelector(
  getCasesState,
  state => state.activeCasesHistory
);

export const getActiveCasesHistoryStats = createSelector(
  getActiveCasesHistoryStatsState,
  fromActiveCasesStatsHistory.globalStats
);

export const getActiveCasesHistoryStatsLoading = createSelector(
  getActiveCasesHistoryStatsState,
  fromActiveCasesStatsHistory.loading
);

/**
 * Active history
 */

export const getActiveCasesDayHistoryStatsState = createSelector(
  getCasesState,
  state => state.activeCasesDayHistory
);

export const getActiveCasesDayHistoryStats = createSelector(
  getActiveCasesDayHistoryStatsState,
  fromActiveCasesStatsDayHistory.globalStats
);

export const getActiveCasesDayHistoryStatsLoading = createSelector(
  getActiveCasesDayHistoryStatsState,
  fromActiveCasesStatsDayHistory.loading
);

/**
 * Closed
 */

export const getClosedCasesState = createSelector(
  getCasesState,
  state => state.closedCases
);

export const getClosedCasesStats = createSelector(
  getClosedCasesState,
  fromClosedCasesStats.globalStats
);

export const getClosedCasesStatsLoading = createSelector(
  getClosedCasesState,
  fromClosedCasesStats.loading
);

export const getClosedCasesHistoryStatsState = createSelector(
  getCasesState,
  state => state.closedCasesHistory
);

export const getClosedCasesHistoryStats = createSelector(
  getClosedCasesHistoryStatsState,
  fromClosedCasesStatsHistory.globalStats
);

export const getClosedCasesHistoryStatsLoading = createSelector(
  getClosedCasesHistoryStatsState,
  fromClosedCasesStatsHistory.loading
);
