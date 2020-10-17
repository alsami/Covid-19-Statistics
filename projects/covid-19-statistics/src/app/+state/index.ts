import { environment } from '@covid19-statistics-environment/environment';
import {
  fromCountriesOfInterest,
  fromLayout,
  fromTitle,
} from '@covid19-statistics/core/+state/reducers';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

export interface AppState {
  title: fromTitle.TitleState;
  countriesOfInterest: fromCountriesOfInterest.CountriesOfInterestState;
  layout: fromLayout.LayoutState;
}

export const reducers: ActionReducerMap<AppState> = {
  title: fromTitle.reducer,
  countriesOfInterest: fromCountriesOfInterest.reducer,
  layout: fromLayout.reducer,
};

// console.log all actions
export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
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

/**
 * Layout Reducwers
 */
export const getLayoutState = createFeatureSelector<fromLayout.LayoutState>(
  'layout'
);

export const getShowStartSidenav = createSelector(
  getLayoutState,
  fromLayout.showStartSidenav
);

export const getShowEndSidenav = createSelector(
  getLayoutState,
  fromLayout.showEndSidenav
);

export const getLoaderType = createSelector(
  getLayoutState,
  fromLayout.loaderType
);

export const getTheme = createSelector(getLayoutState, fromLayout.themeType);

export const getDarkThemeSelected = createSelector(
  getLayoutState,
  fromLayout.darkTheme
);
