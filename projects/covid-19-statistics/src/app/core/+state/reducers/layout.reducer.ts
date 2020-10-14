import { LayoutActions } from '@covid19-statistics/core/+state/actions';
import { LoaderType } from '@covid19-statistics/loaders/models';
import { createReducer, on } from '@ngrx/store';

export interface LayoutState {
  showStartSidenav: boolean;
  showEndSidenav: boolean;
  loaderType?: LoaderType;
}

const initialState: LayoutState = {
  showStartSidenav: true,
  showEndSidenav: false,
  loaderType: null,
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
  }))
);

export function reducer(state: LayoutState, action: any) {
  return _reducer(state, action);
}

export const showStartSidenav = (state: LayoutState) => state.showStartSidenav;

export const showEndSidenav = (state: LayoutState) => state.showEndSidenav;

export const loaderType = (state: LayoutState) => state.loaderType;
