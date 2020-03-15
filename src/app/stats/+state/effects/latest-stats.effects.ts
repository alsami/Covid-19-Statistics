import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { LatestStatsService } from '@covid19/stats/+state/services';
import { latestStatsActions } from '@covid19/stats/+state/actions';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import {
  loaded,
  load,
  loadFailed
} from '@covid19/stats/+state/actions/latest-stats.actions';
import { of } from 'rxjs';

@Injectable()
export class LatestStatsEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      switchMap(() =>
        this.latestStatsService.load().pipe(
          map(stats =>
            loaded({
              latestStats: stats
            })
          ),
          catchError(() => of(loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly latestStatsService: LatestStatsService
  ) {}
}
