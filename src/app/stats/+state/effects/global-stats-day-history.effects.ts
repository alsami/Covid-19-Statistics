import { Injectable } from '@angular/core';
import { globalStatsDayHistoryActions } from '@covid19/stats/+state/actions';
import { GlobalStatsDayHistoryService } from '@covid19/stats/+state/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class GlobalStatsDayHistoryEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(globalStatsDayHistoryActions.load),
      mergeMap(() =>
        this.globalStatsDayHistoryService.load().pipe(
          map(stats =>
            globalStatsDayHistoryActions.loaded({
              globalStats: stats
            })
          ),
          catchError(() => of(globalStatsDayHistoryActions.loadFailed()))
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly globalStatsDayHistoryService: GlobalStatsDayHistoryService
  ) {}
}
