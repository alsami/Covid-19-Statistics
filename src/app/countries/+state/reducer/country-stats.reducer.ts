import { countryStatsActions } from '@covid19/countries/+state/actions';
import { CountryStats } from '@covid19/countries/models';
import { createReducer, on } from '@ngrx/store';

export interface CountryStatsState {
  loading: boolean;
  stats: CountryStats[];
}

const initialState: CountryStatsState = {
  loading: false,
  stats: []
};

const _reducer = createReducer(
  initialState,
  on(countryStatsActions.load, state => ({
    ...state,
    loading: true
  })),
  on(countryStatsActions.loaded, (_, { countryStats }) => ({
    stats: countryStats,
    loading: false
  })),
  on(countryStatsActions.loadFailed, state => ({
    ...state,
    loading: false
  }))
);

export function reducer(state: CountryStatsState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: CountryStatsState) => state.loading;
export const countryStats = (state: CountryStatsState) => state.stats;
