import { globalStatsActions } from '@covid19-global-statistics-lib/lib/+state/actions';
import { GlobalStatistics } from '@covid19-global-statistics-lib/lib/models';
import { createReducer, on } from '@ngrx/store';

export interface GlobalStatsState {
  loading: boolean;
  stats: GlobalStatistics;
}

const initialState: GlobalStatsState = {
  loading: false,
  stats: null,
};

const _reducer = createReducer(
  initialState,
  on(globalStatsActions.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(globalStatsActions.loaded, (_, { latestStats }) => ({
    stats: latestStats,
    loading: false,
  })),
  on(globalStatsActions.loadFailed, (_) => initialState)
);

export function reducer(state: GlobalStatsState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: GlobalStatsState) => state.loading;
export const globalStats = (state: GlobalStatsState) => state.stats;
