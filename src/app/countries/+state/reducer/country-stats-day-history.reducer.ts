import { countryStatsDayHistoryActions } from '@covid19/countries/+state/actions';
import { CountryStats } from '@covid19/countries/models';
import { createReducer, on } from '@ngrx/store';

export interface CountryStatsDayHistoryState {
  loading: boolean;
  stats: CountryStats[];
}

const initialState: CountryStatsDayHistoryState = {
  loading: false,
  stats: []
};

const _reducer = createReducer(
  initialState,
  on(countryStatsDayHistoryActions.load, state => ({
    ...state,
    stats: [],
    loading: true
  })),
  on(countryStatsDayHistoryActions.loaded, (_, { countryStats }) => ({
    stats: countryStats,
    loading: false
  })),
  on(countryStatsDayHistoryActions.loadFailed, state => ({
    ...state,
    loading: false
  }))
);

export function reducer(state: CountryStatsDayHistoryState, action: any) {
  return _reducer(state, action);
}

export const loading = (state: CountryStatsDayHistoryState) => state.loading;
export const countryStats = (state: CountryStatsDayHistoryState) => state.stats;
