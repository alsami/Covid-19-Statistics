import { countryStatsHistoryActions } from '@covid19/countries/+state/actions';
import { CountryStats } from '@covid19/countries/models';
import { createReducer, on } from '@ngrx/store';

export interface CountryStatsHistoryState {
  loading: boolean;
  stats: CountryStats[];
}

const initialState: CountryStatsHistoryState = {
  loading: false,
  stats: []
};

const _reducer = createReducer(
  initialState,
  on(countryStatsHistoryActions.load, state => ({
    ...state,
    loading: true
  })),
  on(countryStatsHistoryActions.loaded, (_, { countryStats }) => ({
    stats: countryStats,
    loading: false
  })),
  on(countryStatsHistoryActions.loadFailed, state => ({
    ...state,
    loading: false
  }))
);

export function reducer(state: CountryStatsHistoryState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: CountryStatsHistoryState) => state.loading;
export const countryStats = (state: CountryStatsHistoryState) => state.stats;
