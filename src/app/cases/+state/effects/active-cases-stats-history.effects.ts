import { Injectable } from '@angular/core';
import { activeCasesStatsHistoryActions } from '@covid19/cases/+state/actions';
import { ActiveCasesStatsHistoryService } from '@covid19/cases/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ActiveCasesStatsHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(activeCasesStatsHistoryActions.load),
      mergeMap(() =>
        this.latestStatsService.load().pipe(
          map(stats =>
            activeCasesStatsHistoryActions.loaded({
              activeCaseStats: stats
            })
          ),
          catchError(() => of(activeCasesStatsHistoryActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly latestStatsService: ActiveCasesStatsHistoryService
  ) {}
}
