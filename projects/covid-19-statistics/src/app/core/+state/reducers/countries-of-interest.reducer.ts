import { countriesOfInterestActions } from '@covid19-statistics/core/+state/actions';
import { createReducer, on } from '@ngrx/store';

export interface CountriesOfInterestState {
  countriesOfInterest: string[];
}

const initialState: CountriesOfInterestState = {
  countriesOfInterest: [],
};

const _reducer = createReducer(
  initialState,
  on(countriesOfInterestActions.load, (state) => state),
  on(countriesOfInterestActions.loaded, (_, { countriesOfInterest }) => ({
    countriesOfInterest: countriesOfInterest,
  }))
);

export function reducer(state: CountriesOfInterestState, action: any) {
  return _reducer(state, action);
}

export const countriesOfInterest = (state: CountriesOfInterestState) =>
  state.countriesOfInterest;
