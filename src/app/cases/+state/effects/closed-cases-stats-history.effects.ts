import { Injectable } from '@angular/core';
import { closedCasesStatsHistoryActions } from '@covid19/cases/+state/actions';
import { ClosedCasesStatsHistoryService } from '@covid19/cases/+state/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ClosedCasesStatsHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closedCasesStatsHistoryActions.load),
      mergeMap(() =>
        this.latestStatsService.load().pipe(
          map(stats =>
            closedCasesStatsHistoryActions.loaded({
              closedCasesStats: stats
            })
          ),
          catchError(() => of(closedCasesStatsHistoryActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly latestStatsService: ClosedCasesStatsHistoryService
  ) {}
}
