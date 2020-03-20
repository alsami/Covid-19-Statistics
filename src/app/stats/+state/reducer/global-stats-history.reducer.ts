import { globalStatsHistoryActions } from '@covid19/stats/+state/actions';
import { GlobalStats } from '@covid19/stats/models';
import { createReducer, on } from '@ngrx/store';

export interface GlobalStatsHistoryState {
  loading: boolean;
  stats: GlobalStats[];
}

const initialState: GlobalStatsHistoryState = {
  loading: false,
  stats: []
};

const _reducer = createReducer(
  initialState,
  on(globalStatsHistoryActions.load, _ => ({
    stats: [],
    loading: true
  })),
  on(globalStatsHistoryActions.loaded, (_, { globalStats }) => ({
    stats: globalStats,
    loading: false
  })),
  on(globalStatsHistoryActions.loadFailed, state => ({
    ...state,
    loading: false
  }))
);

export function reducer(state: GlobalStatsHistoryState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: GlobalStatsHistoryState) => state.loading;
export const globalStats = (state: GlobalStatsHistoryState) => state.stats;
