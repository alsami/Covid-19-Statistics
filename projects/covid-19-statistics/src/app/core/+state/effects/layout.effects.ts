import { Injectable } from '@angular/core';
import { LayoutActions } from '@covid19-statistics/core/+state/actions';
import { LoaderType } from '@covid19-statistics/loaders/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

const KEY = 'LAYOUT_LOADERTYPE';

@Injectable()
export class LayoutEffects {
  restoreLoaderType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LayoutActions.restoreLoaderType),
      map(() => {
        let loaderType = window.localStorage.getItem(KEY);

        if (!loaderType) {
          loaderType = LoaderType.MatSpinner;
        }

        return LayoutActions.setLoaderType({
          loaderType: <LoaderType>loaderType,
        });
      })
    )
  );

  setLoaderType$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LayoutActions.setLoaderType),
        map((action) => window.localStorage.setItem(KEY, action.loaderType))
      ),
    {
      dispatch: false,
    }
  );

  public constructor(private actions$: Actions) {}
}
