import { countriesStatsHistoryActions } from '@covid19/countries/+state/actions';
import { CountryStats } from '@covid19/countries/models';
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
  on(countriesStatsHistoryActions.loadFailed, (_) => initialState)
);

export function reducer(state: CountriesStatsHistoryState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: CountriesStatsHistoryState) => state.loading;
export const countryStatsHistory = (state: CountriesStatsHistoryState) =>
  state.history;
