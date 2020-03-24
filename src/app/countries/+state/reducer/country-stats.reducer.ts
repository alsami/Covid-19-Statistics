import { countryStatsActions } from '@covid19/countries/+state/actions';
import { CountryStats } from '@covid19/countries/models';
import { createReducer, on } from '@ngrx/store';

export interface CountryStatsState {
  loading: boolean;
  stats: CountryStats;
  selectedCountry: string;
}

const initialState: CountryStatsState = {
  loading: false,
  stats: null,
  selectedCountry: null
};

const _reducer = createReducer(
  initialState,
  on(countryStatsActions.load, (state, { country }) => ({
    stats: state.selectedCountry === country ? state.stats : null,
    loading: true,
    selectedCountry: country
  })),
  on(countryStatsActions.loaded, (state, { countryStats }) => ({
    ...state,
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
