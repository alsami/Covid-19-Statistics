import { GlobalStats } from '@covid19/stats/models';
import { createReducer, on } from '@ngrx/store';
import { globalStatsActions } from '@covid19/stats/+state/actions';

export interface LatestStatsState {
  loading: boolean;
  stats: GlobalStats;
}

const initialState: LatestStatsState = {
  loading: false,
  stats: null
};

const _reducer = createReducer(
  initialState,
  on(globalStatsActions.load, state => ({
    ...state,
    loading: true
  })),
  on(globalStatsActions.loaded, (_, { latestStats }) => ({
    stats: latestStats,
    loading: false
  })),
  on(globalStatsActions.loadFailed, state => ({
    ...state,
    loading: false
  }))
);

export function reducer(state: LatestStatsState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: LatestStatsState) => state.loading;
export const globalStats = (state: LatestStatsState) => state.stats;
