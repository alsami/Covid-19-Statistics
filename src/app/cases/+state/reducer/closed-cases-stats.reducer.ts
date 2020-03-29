import { closedCasesStatsActions } from '@covid19/cases/+state/actions';
import { ClosedCaseStats } from '@covid19/cases/models';
import { createReducer, on } from '@ngrx/store';

export interface ClosedCasesStatsState {
  loading: boolean;
  stats: ClosedCaseStats;
}

const initialState: ClosedCasesStatsState = {
  loading: false,
  stats: null
};

const _reducer = createReducer(
  initialState,
  on(closedCasesStatsActions.load, state => ({
    ...state,
    loading: true
  })),
  on(closedCasesStatsActions.loaded, (_, { closedCaseStats }) => ({
    stats: closedCaseStats,
    loading: false
  })),
  on(closedCasesStatsActions.loadFailed, _ => initialState)
);

export function reducer(state: ClosedCasesStatsState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: ClosedCasesStatsState) => state.loading;
export const globalStats = (state: ClosedCasesStatsState) => state.stats;
