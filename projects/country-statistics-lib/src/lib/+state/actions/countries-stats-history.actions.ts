import { CountryStats } from '@covid19-country-statistics-lib/lib/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Countries-Statistics History] Load');
export const loaded = createAction(
  '[Countries-Statistics History] Loaded',
  props<{ countryStats: CountryStats[] }>()
);
export const loadFailed = createAction(
  '[Countries-Statistics History] Load failed'
);
export const reset = createAction('[Countries-Statistics History] Reset');
