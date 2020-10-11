import { CountryOfInterest } from '@covid19-statistics/countries/models';
import { createAction, props } from '@ngrx/store';

export enum CountriesOfInterestActions {
  Load = '[Countries-Of-Interest] Load',
  Loaded = '[Countries-Of-Interest] Loaded',
  Replace = '[Countries-Of-Interest] Replace',
  Store = '[Countries-Of-Interest] Store',
  Remove = '[Countries-Of-Interest] Remove',
}

export const load = createAction(CountriesOfInterestActions.Load);

export const loaded = createAction(
  CountriesOfInterestActions.Loaded,
  props<{ countriesOfInterest: CountryOfInterest[] }>()
);

export const replace = createAction(
  CountriesOfInterestActions.Replace,
  props<{ countriesOfInterest: CountryOfInterest[] }>()
);

export const add = createAction(
  CountriesOfInterestActions.Store,
  props<{ countryOfInterest: CountryOfInterest }>()
);

export const remove = createAction(
  CountriesOfInterestActions.Remove,
  props<{ countryOfInterest: string }>()
);
