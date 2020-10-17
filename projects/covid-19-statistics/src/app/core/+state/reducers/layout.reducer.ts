import { LayoutActions } from '@covid19-statistics/core/+state/actions';
import { darkThemeSelected } from '@covid19-statistics/core/core.functions';
import { LayoutThemeType } from '@covid19-statistics/core/models';
import { LoaderType } from '@covid19-statistics/loaders/models';
import { createReducer, on } from '@ngrx/store';

export interface LayoutState {
  showStartSidenav: boolean;
  showEndSidenav: boolean;
  loaderType?: LoaderType;
  theme?: LayoutThemeType;
}

const initialState: LayoutState = {
  showStartSidenav: true,
  showEndSidenav: false,
  loaderType: null,
  theme: null,
};

const _reducer = createReducer(
  initialState,
  on(LayoutActions.toggleStartSidenav, (state, { show }) => ({
    ...state,
    showStartSidenav: show,
  })),

  on(LayoutActions.toggleEndSidenav, (state, { show }) => ({
    ...state,
    showEndSidenav: show,
  })),
  on(LayoutActions.setLoaderType, (state, { loaderType }) => ({
    ...state,
    loaderType: loaderType,
  })),
  on(LayoutActions.setTheme, (state, { theme }) => ({
    ...state,
    theme,
  }))
);

export function reducer(state: LayoutState, action: any) {
  return _reducer(state, action);
}

export const showStartSidenav = (state: LayoutState) => state.showStartSidenav;

export const showEndSidenav = (state: LayoutState) => state.showEndSidenav;

export const loaderType = (state: LayoutState) => state.loaderType;

export const themeType = (state: LayoutState) => state.theme;

export const darkTheme = (state: LayoutState) => darkThemeSelected(state.theme);
