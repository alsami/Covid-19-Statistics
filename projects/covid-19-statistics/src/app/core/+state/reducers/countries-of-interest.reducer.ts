import { CountriesOfInterestActions } from '@covid19-statistics/core/+state/actions';
import { CountryOfInterest } from '@covid19-statistics/countries/models';
import { createReducer, on } from '@ngrx/store';

export interface CountriesOfInterestState {
  countriesOfInterest: CountryOfInterest[];
}

const initialState: CountriesOfInterestState = {
  countriesOfInterest: [],
};

const _reducer = createReducer(
  initialState,
  on(CountriesOfInterestActions.load, (state) => state),
  on(CountriesOfInterestActions.replace, (_, { countriesOfInterest }) => ({
    countriesOfInterest: countriesOfInterest,
  })),
  on(CountriesOfInterestActions.loaded, (_, { countriesOfInterest }) => ({
    countriesOfInterest: countriesOfInterest,
  }))
);

export function reducer(state: CountriesOfInterestState, action: any) {
  return _reducer(state, action);
}

export const countriesOfInterest = (state: CountriesOfInterestState) =>
  state.countriesOfInterest;
