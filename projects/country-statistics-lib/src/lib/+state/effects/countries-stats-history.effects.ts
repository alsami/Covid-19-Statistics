import { Injectable } from '@angular/core';
import { countriesStatsHistoryActions } from '@covid19-country-statistics-lib/lib/+state/actions';
import * as fromCountries from '@covid19-country-statistics-lib/lib/+state/reducer/';
import { CountriesStatsHistoryService } from '@covid19-country-statistics-lib/lib/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CountriesStatsHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countriesStatsHistoryActions.load),
      withLatestFrom(
        this.store.pipe(select(fromCountries.getCountriesStatsHistory))
      ),
      mergeMap(([_, existingCountriesStatsHistory]) => {
        if (
          existingCountriesStatsHistory &&
          existingCountriesStatsHistory.length
        ) {
          return of(
            countriesStatsHistoryActions.loaded({
              countryStats: existingCountriesStatsHistory,
            })
          );
        }

        return this.countriesStatsHistoryService.load().pipe(
          map((stats) =>
            countriesStatsHistoryActions.loaded({
              countryStats: stats,
            })
          ),
          catchError(() => of(countriesStatsHistoryActions.loadFailed()))
        );
      })
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly countriesStatsHistoryService: CountriesStatsHistoryService,
    private readonly store: Store<fromCountries.CountryState>
  ) {}
}
