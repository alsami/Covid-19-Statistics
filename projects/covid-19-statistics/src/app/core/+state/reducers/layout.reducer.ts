import { layoutActions } from '@covid19-statistics/core/+state/actions';
import { createReducer, on } from '@ngrx/store';

export interface LayoutState {
  showSidenav: boolean;
}

const initialState: LayoutState = {
  showSidenav: true,
};

const _reducer = createReducer(
  initialState,
  on(layoutActions.toggleSidenav, (_, { show }) => ({
    showSidenav: show,
  }))
);

export function reducer(state: LayoutState, action: any) {
  return _reducer(state, action);
}

export const showSidenav = (state: LayoutState) => state.showSidenav;
