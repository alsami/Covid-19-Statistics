import * as fromRoot from '@covid19/+state';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromCountryStats from './country-stats.reducer';

export interface CountryState {
  countryStats: fromCountryStats.CountryStatsState;
}

export interface State extends fromRoot.AppState {
  countries: CountryState;
}

export const reducers: ActionReducerMap<CountryState> = {
  countryStats: fromCountryStats.reducer
};

export const getCountriesState = createFeatureSelector<CountryState>(
  'countries'
);

// /**
//  * Country-Stats
//  */
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
