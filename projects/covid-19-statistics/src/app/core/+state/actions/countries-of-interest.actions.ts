import { createAction, props } from '@ngrx/store';

export const load = createAction('[Countryies of interest] Load');

export const loaded = createAction(
  '[Countryies of interest] Loaded',
  props<{ countriesOfInterest: string[] }>()
);

export const store = createAction(
  '[Countryies of interest] Store',
  props<{ countryOfInterest: string }>()
);

export const remove = createAction(
  '[Countryies of interest] Remove',
  props<{ countryOfInterest: string }>()
);
