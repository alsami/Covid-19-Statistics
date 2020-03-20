import { closedCasesStatsDayHistoryActions } from '@covid19/cases/+state/actions';
import { ClosedCaseStats } from '@covid19/cases/models';
import { createReducer, on } from '@ngrx/store';

export interface ClosedCasesStatsDayHistory {
  loading: boolean;
  dayHistoryStats: ClosedCaseStats[];
}

const initialState: ClosedCasesStatsDayHistory = {
  loading: false,
  dayHistoryStats: []
};

const _reducer = createReducer(
  initialState,
  on(closedCasesStatsDayHistoryActions.load, state => ({
    ...state,
    loading: true
  })),
  on(closedCasesStatsDayHistoryActions.loaded, (_, { closedCasesStats }) => ({
    dayHistoryStats: closedCasesStats,
    loading: false
  })),
  on(closedCasesStatsDayHistoryActions.loadFailed, state => ({
    ...state,
    loading: false
  }))
);

export function reducer(state: ClosedCasesStatsDayHistory, action: any) {
  return _reducer(state, action);
}

export const loading = (state: ClosedCasesStatsDayHistory) => state.loading;
export const dayHistoryStats = (state: ClosedCasesStatsDayHistory) =>
  state.dayHistoryStats;
