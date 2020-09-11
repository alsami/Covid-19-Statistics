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
  props<{ countriesOfInterest: string[] }>()
);

export const replace = createAction(
  CountriesOfInterestActions.Replace,
  props<{ countriesOfInterest: string[] }>()
);

export const add = createAction(
  CountriesOfInterestActions.Store,
  props<{ countryOfInterest: string }>()
);

export const remove = createAction(
  CountriesOfInterestActions.Remove,
  props<{ countryOfInterest: string }>()
);
