import { Injectable } from '@angular/core';
import { countriesStatsActions } from '@covid19-country-statistics-lib/lib/+state/actions';
import { CountriesStatsService } from '@covid19-country-statistics-lib/lib/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CountriesStatsEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countriesStatsActions.load),
      mergeMap(() =>
        this.countriesStatsService.load().pipe(
          map((stats) =>
            countriesStatsActions.loaded({
              countryStats: stats,
            })
          ),
          catchError(() => of(countriesStatsActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly countriesStatsService: CountriesStatsService
  ) {}
}
