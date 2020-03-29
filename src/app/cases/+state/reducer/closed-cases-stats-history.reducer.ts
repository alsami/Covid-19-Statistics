import { closedCasesStatsHistoryActions } from '@covid19/cases/+state/actions';
import { ClosedCaseStats } from '@covid19/cases/models';
import { createReducer, on } from '@ngrx/store';

export interface ClosedCasesStatsHistory {
  loading: boolean;
  stats: ClosedCaseStats[];
}

const initialState: ClosedCasesStatsHistory = {
  loading: false,
  stats: []
};

const _reducer = createReducer(
  initialState,
  on(closedCasesStatsHistoryActions.load, state => ({
    ...state,
    loading: true
  })),
  on(closedCasesStatsHistoryActions.loaded, (_, { closedCasesStats }) => ({
    stats: closedCasesStats,
    loading: false
  })),
  on(closedCasesStatsHistoryActions.loadFailed, _ => initialState)
);

export function reducer(state: ClosedCasesStatsHistory, action: any) {
  return _reducer(state, action);
}

export const loading = (state: ClosedCasesStatsHistory) => state.loading;
export const globalStats = (state: ClosedCasesStatsHistory) => state.stats;
