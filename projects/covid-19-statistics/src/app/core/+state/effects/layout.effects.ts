import { Injectable } from '@angular/core';
import { LayoutActions } from '@covid19-statistics/core/+state/actions';
import { LayoutThemeType } from '@covid19-statistics/core/models';
import { LoaderType } from '@covid19-statistics/loaders/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

const LAYOUT_LOADER_TYPE_KEY = 'LAYOUT_LOADERTYPE';
const LAYOUT_THEME_TYPE_KEY = 'LAYOUT_THEME';

const localStorage = window.localStorage;

@Injectable()
export class LayoutEffects {
  layoutThemeTypes = LayoutThemeType;

  restoreLoaderType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LayoutActions.restoreLoaderType),
      map(() => {
        let loaderType = localStorage.getItem(LAYOUT_LOADER_TYPE_KEY);

        if (!loaderType) {
          loaderType = LoaderType.MatSpinner;
        }

        return LayoutActions.setLoaderType({
          loaderType: <LoaderType>loaderType,
        });
      })
    )
  );

  restoreThemeType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LayoutActions.restoreTheme),
      map(() => {
        let themeType = localStorage.getItem(LAYOUT_THEME_TYPE_KEY);

        if (!themeType) {
          themeType = LayoutThemeType.DeepPurpleAmber;
        }

        return LayoutActions.setTheme({
          theme: <LayoutThemeType>themeType,
        });
      })
    )
  );

  setLoaderType$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LayoutActions.setLoaderType),
        map((action) =>
          localStorage.setItem(LAYOUT_LOADER_TYPE_KEY, action.loaderType)
        )
      ),
    {
      dispatch: false,
    }
  );

  setThemeType$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LayoutActions.setTheme),
        map((action) => {
          localStorage.setItem(LAYOUT_THEME_TYPE_KEY, action.theme);
          let color = '';

          switch (action.theme.valueOf()) {
            case LayoutThemeType.GreyLight.valueOf():
              color = '#607d8b';
              break;
            case LayoutThemeType.DeepPurpleAmber.valueOf():
              color = '#673ab7';
              break;
            case LayoutThemeType.BlackDark.valueOf():
              color = '#212121';
              break;
            case LayoutThemeType.PurpleGreenDark.valueOf():
              color = '#7b1fa2';
              break;
          }
          document
            .querySelector("meta[name='theme-color']")
            .setAttribute('content', color);
        })
      ),
    {
      dispatch: false,
    }
  );

  public constructor(private actions$: Actions) {}
}
