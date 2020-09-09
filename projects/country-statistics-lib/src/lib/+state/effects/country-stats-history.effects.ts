import { Injectable } from '@angular/core';
import { countryStatsHistoryActions } from '@covid19-country-statistics-lib/lib/+state/actions';
import * as fromCountries from '@covid19-country-statistics-lib/lib/+state/reducer/';
import { CountryStatsHistoryService } from '@covid19-country-statistics-lib/lib/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CountryStatsHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countryStatsHistoryActions.load),
      withLatestFrom(
        this.store.pipe(select(fromCountries.getCountryStatsHistory))
      ),
      mergeMap(([action, existingStats]) => {
        if (existingStats && existingStats.length) {
          return of(
            countryStatsHistoryActions.loaded({
              countryStats: existingStats,
            })
          );
        }

        return this.countryStatsHistoryService.load(action.country).pipe(
          map((stats) =>
            countryStatsHistoryActions.loaded({
              countryStats: stats,
            })
          ),
          catchError(() => of(countryStatsHistoryActions.loadFailed()))
        );
      })
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly countryStatsHistoryService: CountryStatsHistoryService,
    private readonly store: Store<fromCountries.CountryState>
  ) {}
}
