import * as fromRoot from '@covid19/+state';
import * as fromGlobalStats from './global-stats.reducer';

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export interface StatsState {
  global: fromGlobalStats.LatestStatsState;
}

export interface State extends fromRoot.AppState {
  global: StatsState;
}

export const reducers: ActionReducerMap<StatsState> = {
  global: fromGlobalStats.reducer
};

export const getStatsState = createFeatureSelector<StatsState>('stats');

export const getLatestStatsState = createSelector(
  getStatsState,
  state => state.global
);

export const getLatestStats = createSelector(
  getLatestStatsState,
  fromGlobalStats.globalStats
);

export const getLatestStatsLoading = createSelector(
  getLatestStatsState,
  fromGlobalStats.loading
);
