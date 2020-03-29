import { activeCasesStatsActions } from '@covid19/cases/+state/actions';
import { ActiveCaseStats } from '@covid19/cases/models';
import { createReducer, on } from '@ngrx/store';

export interface ActiveCasesStatsState {
  loading: boolean;
  stats: ActiveCaseStats;
}

const initialState: ActiveCasesStatsState = {
  loading: false,
  stats: null
};

const _reducer = createReducer(
  initialState,
  on(activeCasesStatsActions.load, state => ({
    ...state,
    loading: true
  })),
  on(activeCasesStatsActions.loaded, (_, { activeCaseStats }) => ({
    stats: activeCaseStats,
    loading: false
  })),
  on(activeCasesStatsActions.loadFailed, _ => initialState)
);

export function reducer(state: ActiveCasesStatsState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: ActiveCasesStatsState) => state.loading;
export const globalStats = (state: ActiveCasesStatsState) => state.stats;
