import { Injectable } from '@angular/core';
import { closedCasesStatsDayHistoryActions } from '@covid19/cases/+state/actions';
import { ClosedCasesStatsDayHistoryService } from '@covid19/cases/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ClosedCasesStatsDayHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closedCasesStatsDayHistoryActions.load),
      mergeMap(() =>
        this.latestStatsService.load().pipe(
          map(stats =>
            closedCasesStatsDayHistoryActions.loaded({
              closedCasesStats: stats
            })
          ),
          catchError(() => of(closedCasesStatsDayHistoryActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly latestStatsService: ClosedCasesStatsDayHistoryService
  ) {}
}
