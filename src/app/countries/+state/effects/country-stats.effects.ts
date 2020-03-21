import { Injectable } from '@angular/core';
import { countryStatsActions } from '@covid19/countries/+state/actions';
import { CountryStatsService } from '@covid19/countries/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CountryStatsEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countryStatsActions.load),
      mergeMap(action =>
        this.countryStatsService.load(action.country).pipe(
          map(stats =>
            countryStatsActions.loaded({
              countryStats: stats
            })
          ),
          catchError(() => of(countryStatsActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly countryStatsService: CountryStatsService
  ) {}
}
