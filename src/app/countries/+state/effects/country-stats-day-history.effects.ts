import { Injectable } from '@angular/core';
import { countryStatsDayHistoryActions } from '@covid19/countries/+state/actions';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountryStatsDayHistoryService } from '@covid19/countries/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CountryStatsDayHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countryStatsDayHistoryActions.load),
      withLatestFrom(
        this.store.pipe(select(fromCountries.getCountryStatsDayHistory))
      ),
      mergeMap(([action, dayHistory]) => {
        if (dayHistory && dayHistory.length) {
          return of(
            countryStatsDayHistoryActions.loaded({
              countryStats: dayHistory,
            })
          );
        }

        return this.countryStatsHistoryService.load(action.country).pipe(
          map((stats) =>
            countryStatsDayHistoryActions.loaded({
              countryStats: stats,
            })
          ),
          catchError(() => of(countryStatsDayHistoryActions.loadFailed()))
        );
      })
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly countryStatsHistoryService: CountryStatsDayHistoryService,
    private readonly store: Store<fromCountries.CountryState>
  ) {}
}
