import { globalStatsDayHistoryActions } from '@covid19/stats/+state/actions';
import { GlobalStats } from '@covid19/stats/models';
import { createReducer, on } from '@ngrx/store';

export interface GlobalStatsDayHistoryState {
  loading: boolean;
  stats: GlobalStats[];
}

const initialState: GlobalStatsDayHistoryState = {
  loading: false,
  stats: []
};

const _reducer = createReducer(
  initialState,
  on(globalStatsDayHistoryActions.load, _ => ({
    stats: [],
    loading: true
  })),
  on(globalStatsDayHistoryActions.loaded, (_, { globalStats }) => ({
    stats: globalStats,
    loading: false
  })),
  on(globalStatsDayHistoryActions.loadFailed, state => ({
    ...state,
    loading: false
  }))
);

export function reducer(state: GlobalStatsDayHistoryState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: GlobalStatsDayHistoryState) => state.loading;
export const globalStats = (state: GlobalStatsDayHistoryState) => state.stats;
