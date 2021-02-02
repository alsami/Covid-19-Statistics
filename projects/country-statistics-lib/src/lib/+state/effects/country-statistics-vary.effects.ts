import { Injectable } from '@angular/core';
import { countryStatisticsVaryActions } from '@covid19-country-statistics-lib/lib/+state/actions';
import { CountryStatisticsVaryService } from '@covid19-country-statistics-lib/lib/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CountryStatisticsVaryEffects {
  loadForCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countryStatisticsVaryActions.loadForCountry),
      mergeMap((action) => {
        return this.service.loadForCountry(action.country).pipe(
          map((loadedVary) =>
            countryStatisticsVaryActions.loadedForCountry({
              vary: loadedVary,
            })
          ),
          catchError(() =>
            of(countryStatisticsVaryActions.loadForCountriesFailed())
          )
        );
      })
    )
  );

  loadForCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countryStatisticsVaryActions.loadForCountries),
      mergeMap(() => {
        return this.service.loadForCountries().pipe(
          map((loadedVary) =>
            countryStatisticsVaryActions.loadedForCountries({
              vary: loadedVary,
            })
          ),
          catchError(() =>
            of(countryStatisticsVaryActions.loadForCountriesFailed())
          )
        );
      })
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly service: CountryStatisticsVaryService
  ) {}
}
