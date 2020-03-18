import {
  fromCountriesOfInterest,
  fromLayout,
  fromTitle
} from '@covid19/core/+state/reducers';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface AppState {
  title: fromTitle.TitleState;
  countriesOfInterest: fromCountriesOfInterest.CountriesOfInterestState;
  layout: fromLayout.LayoutState;
}

export const reducers: ActionReducerMap<AppState> = {
  title: fromTitle.reducer,
  countriesOfInterest: fromCountriesOfInterest.reducer,
  layout: fromLayout.reducer
};

// console.log all actions
export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];

/**
 * Title Reducers
 */
export const getTitleState = createFeatureSelector<fromTitle.TitleState>(
  'title'
);

export const getTitle = createSelector(getTitleState, fromTitle.title);

/**
 * Title Reducers
 */
export const getCountriesOfInterestState = createFeatureSelector<
  fromCountriesOfInterest.CountriesOfInterestState
>('countriesOfInterest');

export const getCountriesOfInterest = createSelector(
  getCountriesOfInterestState,
  fromCountriesOfInterest.countriesOfInterest
);

export const getLayoutState = createFeatureSelector<fromLayout.LayoutState>(
  'layout'
);

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.showSidenav
);
