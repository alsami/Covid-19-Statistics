import { CountryStats } from '@covid19/countries/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Countries cases stats] Load');
export const loaded = createAction(
  '[Countries cases stats] Loaded',
  props<{ countryStats: CountryStats[] }>()
);
export const loadFailed = createAction('[Countries cases stats] Load failed');
