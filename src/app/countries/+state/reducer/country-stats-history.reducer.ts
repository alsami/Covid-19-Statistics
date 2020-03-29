import { countryStatsHistoryActions } from '@covid19/countries/+state/actions';
import { CountryStats } from '@covid19/countries/models';
import { createReducer, on } from '@ngrx/store';

export interface CountryStatsHistoryState {
  loading: boolean;
  stats: CountryStats[];
  selectedCountry: string;
}

const initialState: CountryStatsHistoryState = {
  loading: false,
  stats: [],
  selectedCountry: null
};

const _reducer = createReducer(
  initialState,
  on(countryStatsHistoryActions.load, (state, { country }) => ({
    stats: state.selectedCountry === country ? state.stats : [],
    loading: true,
    selectedCountry: country
  })),
  on(countryStatsHistoryActions.loaded, (state, { countryStats }) => ({
    ...state,
    stats: countryStats,
    loading: false
  })),
  on(countryStatsHistoryActions.loadFailed, _ => initialState)
);

export function reducer(state: CountryStatsHistoryState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: CountryStatsHistoryState) => state.loading;
export const countryStats = (state: CountryStatsHistoryState) => state.stats;
