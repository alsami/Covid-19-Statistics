import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { GlobalStatsService } from '@covid19/stats/+state/services';
import { globalStatsActions } from '@covid19/stats/+state/actions';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
