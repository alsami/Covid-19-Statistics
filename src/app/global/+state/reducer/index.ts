import * as fromRoot from '@covid19/+state';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromGlobalStatsHistory from './global-stats-history.reducer';
import * as fromGlobalStats from './global-stats.reducer';

export interface StatsState {
  global: fromGlobalStats.GlobalStatsState;
  globalHistory: fromGlobalStatsHistory.GlobalStatsHistoryState;
}

export interface State extends fromRoot.AppState {
  global: StatsState;
}

export const reducers: ActionReducerMap<StatsState> = {
  global: fromGlobalStats.reducer,
  globalHistory: fromGlobalStatsHistory.reducer,
};

export const getStatsState = createFeatureSelector<StatsState>('stats');

/**
 * Global stats
 */
export const getGlobalStatsState = createSelector(
  getStatsState,
  (state) => state.global
);

export const getGlobalStats = createSelector(
  getGlobalStatsState,
  fromGlobalStats.globalStats
);

export const getGlobalStatsLoading = createSelector(
  getGlobalStatsState,
  fromGlobalStats.loading
);

/**
 * Global stats history
 */
export const getGlobalHistoryStatsState = createSelector(
  getStatsState,
  (state) => state.globalHistory
);

export const getGlobalHistoryStats = createSelector(
  getGlobalHistoryStatsState,
  fromGlobalStatsHistory.globalStats
);

export const getGlobalHistoryStatsLoading = createSelector(
  getGlobalHistoryStatsState,
  fromGlobalStatsHistory.loading
);
