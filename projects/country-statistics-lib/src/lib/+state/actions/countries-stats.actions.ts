import { CountryStats } from '@covid19-country-statistics-lib/lib/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Countries-Statistics] Load');
export const loaded = createAction(
  '[Countries-Statistics] Loaded',
  props<{ countryStats: CountryStats[] }>()
);
export const loadFailed = createAction('[Countries-Statistics] Load failed');
export const reset = createAction('[Countries-Statistics] Reset');
