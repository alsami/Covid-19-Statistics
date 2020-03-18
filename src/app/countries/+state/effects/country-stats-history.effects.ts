import { Injectable } from '@angular/core';
import { countryStatsHistoryActions } from '@covid19/countries/+state/actions';
import { CountryStatsHistoryService } from '@covid19/countries/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CountryStatsHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countryStatsHistoryActions.load),
      mergeMap(action =>
        this.countryStatsHistoryService.load(action.country).pipe(
          map(stats =>
            countryStatsHistoryActions.loaded({
              countryStats: stats
            })
          ),
          catchError(() => of(countryStatsHistoryActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly countryStatsHistoryService: CountryStatsHistoryService
  ) {}
}
