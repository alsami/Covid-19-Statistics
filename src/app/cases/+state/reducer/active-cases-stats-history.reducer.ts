import { activeCasesStatsHistoryActions } from '@covid19/cases/+state/actions';
import { ActiveCaseStats } from '@covid19/cases/models';
import { createReducer, on } from '@ngrx/store';

export interface ActiveCasesStatsHistory {
  loading: boolean;
  stats: ActiveCaseStats[];
}

const initialState: ActiveCasesStatsHistory = {
  loading: false,
  stats: []
};

const _reducer = createReducer(
  initialState,
  on(activeCasesStatsHistoryActions.load, state => ({
    ...state,
    loading: true
  })),
  on(activeCasesStatsHistoryActions.loaded, (_, { activeCaseStats }) => ({
    stats: activeCaseStats,
    loading: false
  })),
  on(activeCasesStatsHistoryActions.loadFailed, state => ({
    ...state,
    loading: false
  }))
);

export function reducer(state: ActiveCasesStatsHistory, action: any) {
  return _reducer(state, action);
}

export const loading = (state: ActiveCasesStatsHistory) => state.loading;
export const globalStats = (state: ActiveCasesStatsHistory) => state.stats;
