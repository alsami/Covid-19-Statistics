import { CountryStats } from '@covid19-country-statistics-lib/lib/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction(
  '[Countries-Statistics] Load for country',
  props<{ country: string }>()
);
export const loaded = createAction(
  '[Countries-Statistics] Loaded for country',
  props<{ countryStats: CountryStats }>()
);
export const loadFailed = createAction(
  '[Countries-Statistics] Load for country failed'
);
