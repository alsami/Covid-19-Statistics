import { Injectable } from '@angular/core';
import { activeCasesStatsActions } from '@covid19/cases/+state/actions';
import { ActiveCasesStatsService } from '@covid19/cases/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ActiveCasesStatsEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(activeCasesStatsActions.load),
      mergeMap(() =>
        this.latestStatsService.load().pipe(
          map(stats =>
            activeCasesStatsActions.loaded({
              activeCaseStats: stats
            })
          ),
          catchError(() => of(activeCasesStatsActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly latestStatsService: ActiveCasesStatsService
  ) {}
}
