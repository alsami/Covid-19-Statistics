import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { fromTitle } from '@covid19/core/+state/reducers';

export interface AppState {
    title: fromTitle.TitleState;
}

export const reducers: ActionReducerMap<AppState> = {
    title: fromTitle.reducer,
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

export const getTitle = createSelector(
    getTitleState,
    fromTitle.title
);
