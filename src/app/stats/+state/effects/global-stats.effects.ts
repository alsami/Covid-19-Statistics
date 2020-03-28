import { Injectable } from '@angular/core';
import { globalStatsActions } from '@covid19/stats/+state/actions';
import { GlobalStatsService } from '@covid19/stats/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class GlobalStatsEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(globalStatsActions.load),
      mergeMap(() =>
        this.latestStatsService.load().pipe(
          map(stats =>
            globalStatsActions.loaded({
              latestStats: stats
            })
          ),
          catchError(() => of(globalStatsActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly latestStatsService: GlobalStatsService
  ) {}
}
