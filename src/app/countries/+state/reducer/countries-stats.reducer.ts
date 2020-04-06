import { countriesStatsActions } from '@covid19/countries/+state/actions';
import { CountryStats } from '@covid19/countries/models';
import { createReducer, on } from '@ngrx/store';

export interface CountriesStatsState {
  loading: boolean;
  stats: CountryStats[];
}

const initialState: CountriesStatsState = {
  loading: false,
  stats: [],
};

const _reducer = createReducer(
  initialState,
  on(countriesStatsActions.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(countriesStatsActions.loaded, (_, { countryStats }) => ({
    stats: countryStats,
    loading: false,
  })),
  on(
    countriesStatsActions.loadFailed,
    countriesStatsActions.reset,
    (_) => initialState
  )
);

export function reducer(state: CountriesStatsState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: CountriesStatsState) => state.loading;
export const countryStats = (state: CountriesStatsState) => state.stats;
