import { Injectable } from '@angular/core';
import { activeCasesStatsDayHistoryActions } from '@covid19/cases/+state/actions';
import { ActiveCasesStatsDayHistoryService } from '@covid19/cases/+state/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ActiveCasesStatsDayHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(activeCasesStatsDayHistoryActions.load),
      mergeMap(() =>
        this.activeCasesStatsDayHistoryService.load().pipe(
          map(stats =>
            activeCasesStatsDayHistoryActions.loaded({
              activeCaseStats: stats
            })
          ),
          catchError(() => of(activeCasesStatsDayHistoryActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly activeCasesStatsDayHistoryService: ActiveCasesStatsDayHistoryService
  ) {}
}
