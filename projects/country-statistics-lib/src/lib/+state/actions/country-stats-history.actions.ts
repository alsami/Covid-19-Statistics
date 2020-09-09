import { CountryStats } from '@covid19-country-statistics-lib/lib/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction(
  '[Country-Statistics history] Load history for country',
  props<{ country: string }>()
);
export const loaded = createAction(
  '[Country-Statistics history] Loaded history for country',
  props<{ countryStats: CountryStats[] }>()
);
export const loadFailed = createAction(
  '[Country-Statistics history] Load history for country failed'
);
