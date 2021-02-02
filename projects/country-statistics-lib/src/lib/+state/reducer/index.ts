import * as fromRoot from '@covid19-statistics/+state';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromCountriesStatsHistory from './countries-stats-history.reducer';
import * as fromCountriesStats from './countries-stats.reducer';
import * as fromCountryStatisticsVary from './country-statistics-vary.reducer';
import * as fromCountryStatsHistory from './country-stats-history.reducer';
import * as fromCountryStats from './country-stats.reducer';

export interface CountryState {
  countriesStats: fromCountriesStats.CountriesStatsState;
  countriesStatsHistory: fromCountriesStatsHistory.CountriesStatsHistoryState;
  countryStats: fromCountryStats.CountryStatsState;
  countryStatsHistory: fromCountryStatsHistory.CountryStatsHistoryState;
  countryStatisticsVary: fromCountryStatisticsVary.CountryStatisticsVaryState;
}

export interface State extends fromRoot.AppState {
  countries: CountryState;
}

export const reducers: ActionReducerMap<CountryState> = {
  countriesStats: fromCountriesStats.reducer,
  countriesStatsHistory: fromCountriesStatsHistory.reducer,
  countryStats: fromCountryStats.reducer,
  countryStatsHistory: fromCountryStatsHistory.reducer,
  countryStatisticsVary: fromCountryStatisticsVary.reducer,
};

export const COUNTRIES_FEATURE_SELECTOR = 'countries';

export const getCountriesState = createFeatureSelector<CountryState>(
  COUNTRIES_FEATURE_SELECTOR
);

/**
 * Countries-Stats
 */
export const getCountriesStatsState = createSelector(
  getCountriesState,
  (state) => state.countriesStats
);

export const getCountriesStats = createSelector(
  getCountriesStatsState,
  fromCountriesStats.countryStats
);

export const getCountriesStatsLoading = createSelector(
  getCountriesStatsState,
  fromCountriesStats.loading
);

/**
 * Countries-Stats-History
 */
export const getCountriesStatsHistoryState = createSelector(
  getCountriesState,
  (state) => state.countriesStatsHistory
);

export const getCountriesStatsHistory = createSelector(
  getCountriesStatsHistoryState,
  fromCountriesStatsHistory.countryStatsHistory
);

export const getCountriesStatsHistoryLoading = createSelector(
  getCountriesStatsHistoryState,
  fromCountriesStatsHistory.loading
);

/**
 * Country-Stats
 */
export const getCountryStatsState = createSelector(
  getCountriesState,
  (state) => state.countryStats
);

export const getCountryStats = createSelector(
  getCountryStatsState,
  fromCountryStats.countryStats
);

export const getCountryStatsLoading = createSelector(
  getCountryStatsState,
  fromCountryStats.loading
);

/**
 * Country-Stats History
 */
export const getCountryStatsHistoryState = createSelector(
  getCountriesState,
  (state) => state.countryStatsHistory
);

export const getCountryStatsHistory = createSelector(
  getCountryStatsHistoryState,
  fromCountryStatsHistory.countryStats
);

export const getCountryStatsHistoryLoading = createSelector(
  getCountryStatsHistoryState,
  fromCountryStatsHistory.loading
);

/**
 * Country-Statistics Vary
 */
export const getCountryStatisticsVaryState = createSelector(
  getCountriesState,
  (state) => state.countryStatisticsVary
);

export const getCountryStatisticsVaryForCountry = createSelector(
  getCountryStatisticsVaryState,
  fromCountryStatisticsVary.countryVary
);

export const getCountryStatisticsVaryForCountries = createSelector(
  getCountryStatisticsVaryState,
  fromCountryStatisticsVary.countriesVary
);

export const getCountryStatisticsVaryLoading = createSelector(
  getCountryStatisticsVaryState,
  fromCountryStatisticsVary.loading
);
