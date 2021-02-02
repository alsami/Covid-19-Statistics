import { countryStatisticsVaryActions } from '@covid19-country-statistics-lib/lib/+state/actions';
import { CountryStatisticsVaryContainer } from '@covid19-country-statistics-lib/lib/models';
import { createReducer, on } from '@ngrx/store';

export interface CountryStatisticsVaryState {
  loading: boolean;
  countriesVary: CountryStatisticsVaryContainer[];
  countryVary: CountryStatisticsVaryContainer[];
}

const initialState: CountryStatisticsVaryState = {
  loading: false,
  countriesVary: null,
  countryVary: null,
};

const _reducer = createReducer(
  initialState,
  on(
    countryStatisticsVaryActions.loadForCountry,
    countryStatisticsVaryActions.loadForCountries,
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(countryStatisticsVaryActions.loadedForCountry, (state, { vary }) => ({
    ...state,
    loading: false,
    countryVary: vary,
  })),
  on(countryStatisticsVaryActions.loadedForCountries, (state, { vary }) => ({
    ...state,
    loading: false,
    countriesVary: vary,
  })),
  on(
    countryStatisticsVaryActions.loadForCountryFailed,
    countryStatisticsVaryActions.loadForCountriesFailed,
    (state) => ({
      ...state,
      loading: false,
    })
  )
);

export function reducer(state: CountryStatisticsVaryState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: CountryStatisticsVaryState) => state.loading;

export const countryVary = (state: CountryStatisticsVaryState) =>
  state.countryVary;

export const countriesVary = (state: CountryStatisticsVaryState) =>
  state.countriesVary;
