import { LoaderType } from '@covid19-statistics/loaders/models';
import { createAction, props } from '@ngrx/store';

enum LayoutActions {
  ToggleStartSidenav = '[Layout] Toggle start-sidenav',
  ToggleEndSidenav = '[Layout] Toggle end-sidenav',
  SetLoaderType = '[Layout] Set loader type',
  RestoreLoader = '[Layout] Restore loader type',
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
