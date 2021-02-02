import { CountryStatisticsVaryContainer } from '@covid19-country-statistics-lib/lib/models';
import { createAction, props } from '@ngrx/store';

enum Actions {
  LoadForCountry = '[Country-Statistics-Vary] Load For Country',
  LoadedForCountry = '[Country-Statistics-Vary] Loaded For Country',
  LoadForCountryFailed = '[Country-Statistics-Vary] Loaded For Country Failed',

  LoadForCountries = '[Country-Statistics-Vary] Load For Countries',
  LoadedForCountries = '[Country-Statistics-Vary] Loaded For Countries',
  LoadForCountriesFailed = '[Country-Statistics-Vary] Loaded For Countries Failed',
}

export const loadForCountry = createAction(
  Actions.LoadForCountry,
  props<{ country: string }>()
);

export const loadedForCountry = createAction(
  Actions.LoadedForCountry,
  props<{ vary: CountryStatisticsVaryContainer[] }>()
);

export const loadForCountryFailed = createAction(Actions.LoadForCountryFailed);

export const loadForCountries = createAction(Actions.LoadForCountries);

export const loadedForCountries = createAction(
  Actions.LoadedForCountries,
  props<{ vary: CountryStatisticsVaryContainer[] }>()
);

export const loadForCountriesFailed = createAction(
  Actions.LoadForCountriesFailed
);
