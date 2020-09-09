import { countriesStatsHistoryActions } from '@covid19-country-statistics-lib/lib/+state/actions';
import { CountryStats } from '@covid19-country-statistics-lib/lib/models';
import { createReducer, on } from '@ngrx/store';

export interface CountriesStatsHistoryState {
  loading: boolean;
  history: CountryStats[];
}

const initialState: CountriesStatsHistoryState = {
  loading: false,
  history: [],
};

const _reducer = createReducer(
  initialState,
  on(countriesStatsHistoryActions.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(countriesStatsHistoryActions.loaded, (_, { countryStats }) => ({
    history: countryStats,
    loading: false,
  })),
  on(
    countriesStatsHistoryActions.loadFailed,
    countriesStatsHistoryActions.reset,
    (_) => initialState
  )
);

export function reducer(state: CountriesStatsHistoryState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: CountriesStatsHistoryState) => state.loading;
export const countryStatsHistory = (state: CountriesStatsHistoryState) =>
  state.history;
