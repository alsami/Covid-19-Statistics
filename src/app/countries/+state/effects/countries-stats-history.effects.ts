import { Injectable } from '@angular/core';
import { countriesStatsHistoryActions } from '@covid19/countries/+state/actions';
import { CountriesStatsHistoryService } from '@covid19/countries/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CountriesStatsHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countriesStatsHistoryActions.load),
      mergeMap(() =>
        this.countriesStatsHistoryService.load().pipe(
          map((stats) =>
            countriesStatsHistoryActions.loaded({
              countryStats: stats,
            })
          ),
          catchError(() => of(countriesStatsHistoryActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly countriesStatsHistoryService: CountriesStatsHistoryService
  ) {}
}
