import { Injectable } from '@angular/core';
import { countryStatsDayHistoryActions } from '@covid19/countries/+state/actions';
import { CountryStatsDayHistoryService } from '@covid19/countries/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CountryStatsDayHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countryStatsDayHistoryActions.load),
      mergeMap(action =>
        this.countryStatsHistoryService.load(action.country).pipe(
          map(stats =>
            countryStatsDayHistoryActions.loaded({
              countryStats: stats
            })
          ),
          catchError(() => of(countryStatsDayHistoryActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly countryStatsHistoryService: CountryStatsDayHistoryService
  ) {}
}
