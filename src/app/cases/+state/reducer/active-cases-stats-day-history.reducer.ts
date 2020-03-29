import { activeCasesStatsDayHistoryActions } from '@covid19/cases/+state/actions';
import { ActiveCaseStats } from '@covid19/cases/models';
import { createReducer, on } from '@ngrx/store';

export interface ActiveCasesStatsDayHistory {
  loading: boolean;
  stats: ActiveCaseStats[];
}

const initialState: ActiveCasesStatsDayHistory = {
  loading: false,
  stats: []
};

const _reducer = createReducer(
  initialState,
  on(activeCasesStatsDayHistoryActions.load, state => ({
    ...state,
    loading: true
  })),
  on(activeCasesStatsDayHistoryActions.loaded, (_, { activeCaseStats }) => ({
    stats: activeCaseStats,
    loading: false
  })),
  on(activeCasesStatsDayHistoryActions.loadFailed, _ => initialState)
);

export function reducer(state: ActiveCasesStatsDayHistory, action: any) {
  return _reducer(state, action);
}

export const loading = (state: ActiveCasesStatsDayHistory) => state.loading;
export const globalStats = (state: ActiveCasesStatsDayHistory) => state.stats;
