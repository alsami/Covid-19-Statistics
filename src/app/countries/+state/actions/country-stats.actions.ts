import { CountryStats } from '@covid19/countries/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction(
  '[Country cases stats] Load for country',
  props<{ country: string }>()
);
export const loaded = createAction(
  '[Country cases stats] Loaded for country',
  props<{ countryStats: CountryStats }>()
);
export const loadFailed = createAction(
  '[Country cases stats] Load for country failed'
);
