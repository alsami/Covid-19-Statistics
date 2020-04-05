import { CountryStats } from '@covid19/countries/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Countries history cases stats] Load');
export const loaded = createAction(
  '[Countries history cases stats] Loaded',
  props<{ countryStats: CountryStats[] }>()
);
export const loadFailed = createAction(
  '[Countries history cases stats] Load failed'
);
