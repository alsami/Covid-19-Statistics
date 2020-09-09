import { globalStatsHistoryActions } from '@covid19-global-statistics-lib/lib/+state/actions';
import { GlobalStatistics } from '@covid19-global-statistics-lib/lib/models';
import { createReducer, on } from '@ngrx/store';

export interface GlobalStatsHistoryState {
  loading: boolean;
  stats: GlobalStatistics[];
}

const initialState: GlobalStatsHistoryState = {
  loading: false,
  stats: [],
};

const _reducer = createReducer(
  initialState,
  on(globalStatsHistoryActions.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(globalStatsHistoryActions.loaded, (_, { globalStats }) => ({
    stats: globalStats,
    loading: false,
  })),
  on(globalStatsHistoryActions.loadFailed, (_) => initialState)
);

export function reducer(state: GlobalStatsHistoryState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: GlobalStatsHistoryState) => state.loading;
export const globalStats = (state: GlobalStatsHistoryState) => state.stats;
