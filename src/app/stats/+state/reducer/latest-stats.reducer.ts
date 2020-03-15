import { LatestStats } from '@covid19/stats/models';
import { createReducer, on } from '@ngrx/store';
import { latestStatsActions } from '@covid19/stats/+state/actions';

export interface LatestStatsState {
  loading: boolean;
  stats: LatestStats;
}

const initialState: LatestStatsState = {
  loading: false,
  stats: null
};

const _reducer = createReducer(
  initialState,
  on(latestStatsActions.load, state => ({
    ...state,
    loading: true
  })),
  on(latestStatsActions.loaded, (_, { latestStats }) => ({
    stats: latestStats,
    loading: false
  })),
  on(latestStatsActions.loadFailed, state => ({
    ...state,
    loading: false
  }))
);

export function reducer(state: LatestStatsState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: LatestStatsState) => state.loading;
export const latestStats = (state: LatestStatsState) => state.stats;
