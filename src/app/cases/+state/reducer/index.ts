import * as fromRoot from '@covid19/+state';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromActiveCasesStatsHistory from './active-cases-stats-history.reducer';
import * as fromActiveCasesStats from './active-cases-stats.reducer';

export interface CasesState {
  activeCases: fromActiveCasesStats.ActiveCasesStatsState;
  activeCasesHistory: fromActiveCasesStatsHistory.ActiveCasesStatsHistory;
}

export interface State extends fromRoot.AppState {
  cases: CasesState;
}

export const reducers: ActionReducerMap<CasesState> = {
  activeCases: fromActiveCasesStats.reducer,
  activeCasesHistory: fromActiveCasesStatsHistory.reducer
};

export const getCasesState = createFeatureSelector<CasesState>('cases');

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
