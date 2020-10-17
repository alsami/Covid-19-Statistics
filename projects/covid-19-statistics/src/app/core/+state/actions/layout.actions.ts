import { LayoutThemeType } from '@covid19-statistics/core/models';
import { LoaderType } from '@covid19-statistics/loaders/models';
import { createAction, props } from '@ngrx/store';

enum LayoutActions {
  ToggleStartSidenav = '[Layout] Toggle start-sidenav',
  ToggleEndSidenav = '[Layout] Toggle end-sidenav',
  SetLoaderType = '[Layout] Set loader type',
  RestoreLoader = '[Layout] Restore loader type',
  RestoreTheme = '[Layout] Restore theme',
  SetTheme = '[Layout] Set theme',
}

export const toggleStartSidenav = createAction(
  LayoutActions.ToggleStartSidenav,
  props<{ show: boolean }>()
);

export const toggleEndSidenav = createAction(
  LayoutActions.ToggleEndSidenav,
  props<{ show: boolean }>()
);

export const setLoaderType = createAction(
  LayoutActions.SetLoaderType,
  props<{ loaderType: LoaderType }>()
);

export const restoreLoaderType = createAction(LayoutActions.RestoreLoader);

export const setTheme = createAction(
  LayoutActions.SetTheme,
  props<{ theme: LayoutThemeType }>()
);

export const restoreTheme = createAction(LayoutActions.RestoreTheme);
