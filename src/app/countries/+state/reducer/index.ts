import * as fromRoot from '@covid19/+state';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromCountryStatsDayHistory from './country-stats-day-history.reducer';
import * as fromCountryStatsHistory from './country-stats-history.reducer';
import * as fromCountryStats from './country-stats.reducer';

export interface CountryState {
  countryStats: fromCountryStats.CountryStatsState;
  countryStatsHistory: fromCountryStatsHistory.CountryStatsHistoryState;
  countryStatsDayHistory: fromCountryStatsDayHistory.CountryStatsDayHistoryState;
}

export interface State extends fromRoot.AppState {
  countries: CountryState;
}

export const reducers: ActionReducerMap<CountryState> = {
  countryStats: fromCountryStats.reducer,
  countryStatsHistory: fromCountryStatsHistory.reducer,
  countryStatsDayHistory: fromCountryStatsDayHistory.reducer
};

export const getCountriesState = createFeatureSelector<CountryState>(
  'countries'
);

/**
 * Country-Stats
 */
export const getCountryState = createSelector(
  getCountriesState,
  state => state.countryStats
);

export const getCountryStats = createSelector(
  getCountryState,
  fromCountryStats.countryStats
);

export const getCountryStatsLoading = createSelector(
  getCountryState,
  fromCountryStats.loading
);

/**
 * Country-Stats History
 */
export const getCountryHistoryState = createSelector(
  getCountriesState,
  state => state.countryStatsHistory
);

export const getCountryHistoryStats = createSelector(
  getCountryHistoryState,
  fromCountryStatsHistory.countryStats
);

export const getCountryHistoryStatsLoading = createSelector(
  getCountryHistoryState,
  fromCountryStatsHistory.loading
);

/**
 * Country-Stats Day History
 */
export const getCountryDayHistoryState = createSelector(
  getCountriesState,
  state => state.countryStatsDayHistory
);

export const getCountryDayHistoryStats = createSelector(
  getCountryDayHistoryState,
  fromCountryStatsDayHistory.countryStats
);

export const getCountryDayHistoryStatsLoading = createSelector(
  getCountryDayHistoryState,
  fromCountryStatsDayHistory.loading
);
