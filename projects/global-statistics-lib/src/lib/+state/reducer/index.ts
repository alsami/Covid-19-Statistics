import * as fromRoot from '@covid19-statistics/+state';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromGlobalStatsHistory from './global-stats-history.reducer';
import * as fromGlobalStats from './global-stats.reducer';

export interface GlobalStatisticsState {
  globalStatistics: fromGlobalStats.GlobalStatsState;
  globalStatisticsHistory: fromGlobalStatsHistory.GlobalStatsHistoryState;
}

export interface State extends fromRoot.AppState {
  globalStatistics: GlobalStatisticsState;
}

export const reducers: ActionReducerMap<GlobalStatisticsState> = {
  globalStatistics: fromGlobalStats.reducer,
  globalStatisticsHistory: fromGlobalStatsHistory.reducer,
};

export const GLOBAL_STATISTICS_FEATURE_SELECTOR = 'globalStatistics';

export const getStatsState = createFeatureSelector<GlobalStatisticsState>(
  GLOBAL_STATISTICS_FEATURE_SELECTOR
);

/**
 * Global stats
 */
export const getGlobalStatsState = createSelector(
  getStatsState,
  (state) => state.globalStatistics
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
  (state) => state.globalStatisticsHistory
);

export const getGlobalHistoryStats = createSelector(
  getGlobalHistoryStatsState,
  fromGlobalStatsHistory.globalStats
);

export const getGlobalHistoryStatsLoading = createSelector(
  getGlobalHistoryStatsState,
  fromGlobalStatsHistory.loading
);
