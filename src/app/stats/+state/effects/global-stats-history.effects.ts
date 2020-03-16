import { Injectable } from '@angular/core';
import { globalStatsHistoryActions } from '@covid19/stats/+state/actions';
import { GlobalStatsHistoryService } from '@covid19/stats/+state/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class GlobalStatsHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(globalStatsHistoryActions.load),
      mergeMap(() =>
        this.latestStatsService.load().pipe(
          map(stats =>
            globalStatsHistoryActions.loaded({
              globalStats: stats
            })
          ),
          catchError(() => of(globalStatsHistoryActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly latestStatsService: GlobalStatsHistoryService
  ) {}
}
