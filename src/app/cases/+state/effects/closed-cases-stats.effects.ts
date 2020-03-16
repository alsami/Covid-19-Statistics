import { Injectable } from '@angular/core';
import { closedCasesStatsActions } from '@covid19/cases/+state/actions';
import { ClosedCasesStatsService } from '@covid19/cases/+state/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ClosedCasesStatsEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closedCasesStatsActions.load),
      mergeMap(() =>
        this.latestStatsService.load().pipe(
          map(stats =>
            closedCasesStatsActions.loaded({
              closedCaseStats: stats
            })
          ),
          catchError(() => of(closedCasesStatsActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly latestStatsService: ClosedCasesStatsService
  ) {}
}
