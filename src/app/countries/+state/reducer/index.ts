import * as fromRoot from '@covid19/+state';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromCountriesStats from './countries-stats.reducer';
import * as fromCountryStatsDayHistory from './country-stats-day-history.reducer';
import * as fromCountryStatsHistory from './country-stats-history.reducer';
import * as fromCountryStats from './country-stats.reducer';

export interface CountryState {
  countriesStats: fromCountriesStats.CountriesStatsState;
  countryStats: fromCountryStats.CountryStatsState;
  countryStatsHistory: fromCountryStatsHistory.CountryStatsHistoryState;
  countryStatsDayHistory: fromCountryStatsDayHistory.CountryStatsDayHistoryState;
}

export interface State extends fromRoot.AppState {
  countries: CountryState;
}

export const reducers: ActionReducerMap<CountryState> = {
  countriesStats: fromCountriesStats.reducer,
  countryStats: fromCountryStats.reducer,
  countryStatsHistory: fromCountryStatsHistory.reducer,
  countryStatsDayHistory: fromCountryStatsDayHistory.reducer
};

export const getCountriesState = createFeatureSelector<CountryState>(
  'countries'
);

/**
 * Countries-Stats
 */
export const getCountriesStatsState = createSelector(
  getCountriesState,
  state => state.countriesStats
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
 * Country-Stats
 */
export const getCountryStatsState = createSelector(
  getCountriesState,
  state => state.countryStats
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
  state => state.countryStatsHistory
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
 * Country-Stats Day History
 */
export const getCountryStatsDayHistoryState = createSelector(
  getCountriesState,
  state => state.countryStatsDayHistory
);

export const getCountryStatsDayHistory = createSelector(
  getCountryStatsDayHistoryState,
  fromCountryStatsDayHistory.countryStats
);

export const getCountryStatsDayHistoryLoading = createSelector(
  getCountryStatsDayHistoryState,
  fromCountryStatsDayHistory.loading
);
