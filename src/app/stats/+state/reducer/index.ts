import * as fromRoot from '@covid19/+state';
import * as fromLatests from './latest-stats.reducer';

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export interface StatsState {
  latest: fromLatests.LatestStatsState;
}

export interface State extends fromRoot.AppState {
  latest: StatsState;
}

export const reducers: ActionReducerMap<StatsState> = {
  latest: fromLatests.reducer
};

export const getStatsState = createFeatureSelector<StatsState>('stats');

export const getLatestStatsState = createSelector(
  getStatsState,
  state => state.latest
);

export const getLatestStats = createSelector(
  getLatestStatsState,
  fromLatests.latestStats
);
