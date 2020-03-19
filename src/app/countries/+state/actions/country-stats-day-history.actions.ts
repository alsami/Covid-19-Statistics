import { CountryStats } from '@covid19/countries/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction(
  '[Country day history] Load day history for country',
  props<{ country: string }>()
);
export const loaded = createAction(
  '[Country day history] Loaded day history for country',
  props<{ countryStats: CountryStats[] }>()
);
export const loadFailed = createAction(
  '[Country day history] Load day history for country failed'
);
